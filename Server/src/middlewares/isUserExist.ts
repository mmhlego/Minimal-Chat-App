import { RequestHandler } from "express";
import User from "../models/user";

export const isUserExist: RequestHandler = async (req, res, next) => {
	const members = req.body.members;
	let err = false;
	await await Promise.all(
		members.map(async (member: string) => {
			const user = await User.findOne({ username: member });
			if (!user) {
				err = true;
				next(new Error(member + " not found!"));
			}
		})
	);
	if (!err) next();
};
