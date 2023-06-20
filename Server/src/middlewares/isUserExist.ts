import { RequestHandler } from "express";
import User from "../models/user";

export const isUserExist: RequestHandler = (req, res, next) => {
	const members = req.body.members;
	members.forEach((member: string) => {
		User.findOne({ username: member })
			.then((result) => {
				if (!result) {
					throw new Error(member + " not found!");
				}
			})
			.catch((err) => {
				next(err);
			});
	});
	next();
};
