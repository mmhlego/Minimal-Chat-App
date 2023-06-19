import { RequestHandler } from "express";
import { ResError, CustomReq } from "../app";
import jwt from "jsonwebtoken";

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
export default isAuth;
