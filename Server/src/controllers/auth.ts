import { RequestHandler } from "express";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomReq, ResError } from "../app";

const signup: RequestHandler = (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const password = req.body.password;
	const avatarUrl = req.body.avatarUrl;
	bcrypt
		.hash(password, 12)
		.then((hashedPw) => {
			const user = new User({
				username,
				email,
				password: hashedPw,
				firstName,
				lastName,
				avatarUrl,
			});
			return user.save();
		})
		.then((result) => {
			const token = jwt.sign(
				{
					email: result.email,
					userId: result._id.toString(),
				},
				"somesupersecretsecret",
				{ expiresIn: "365d" }
			);
			res.status(201).json({
				status: "success",
				data: token,
			});
		})
		.catch((err) => {
			if (err.code === 11000) {
				err.status = 500;
				err.message = "email and username must be unique";
			}
			next(err);
		});
};

const login: RequestHandler = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	let loadedUser: IUser;
	User.findOne({ username })
		.then((user) => {
			if (!user) {
				const error = new Error(
					"A user with this username could not be found."
				);
				// error.statusCode = 401;
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then((isEqual) => {
			if (!isEqual) {
				const error = new Error("Wrong password!") as ResError;
				error.status = 401;
				throw error;
			}
			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser._id.toString(),
				},
				"somesupersecretsecret",
				{ expiresIn: "1h" }
			);
			res.status(200).json({
				status: "success",
				data: token,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

const isAuth: RequestHandler = (req, res, next) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		const error = new Error("Not authenticated.") as ResError;
		error.status = 401;
		throw error;
	}
	const token = authHeader.split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, "somesupersecretsecret");
	} catch (err: any) {
		err.status = 500;
		throw err;
	}
	if (!decodedToken) {
		const error = new Error("Not authenticated.") as ResError;
		error.status = 401;
		throw error;
	}
	(req as CustomReq).userId = (decodedToken as { userId: string }).userId;
	next();
};

export { login, signup, isAuth };
