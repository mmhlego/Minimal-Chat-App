import { RequestHandler } from "express";
import { CustomReq, ResError } from "../app";
import User, { IUser } from "../models/user";
import { Types } from "mongoose";
import bcrypt from "bcrypt";

export const getProfile: RequestHandler = (req, res, next) => {
	const userId = (req as CustomReq).userId;
	User.findOne({ _id: userId })
		.then((user) => {
			if (!user) {
				const error = new Error(
					"A user with this id could not be found."
				) as ResError;
				error.status = 401;
				throw error;
			}
			res.status(200).json({
				status: "success",
				data: {
					username: user.username,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					avatarUrl: user.avatarUrl,
				},
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

export const updateProfile: RequestHandler = (req, res, next) => {
	const userId = (req as CustomReq).userId;
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	// const password = req.body.password;
	const avatarUrl = req.body.avatarUrl;
	// bcrypt
	// 	.hash(password, 12)
	// 	.then((hashedPw) => {
	// 		return
	User.updateOne(
		{ _id: userId },
		{
			email,
			firstName,
			lastName,
			avatarUrl,
			// password: hashedPw,
		}
	)
		// })
		.then(() => {
			res.status(200).json({
				status: "success",
				data: {},
			});
		})
		.catch((err) => {
			err.statusCode = 500;
			if (err.code === 11000) {
				err.message = "email must be unique";
			}
			next(err);
		});
};
