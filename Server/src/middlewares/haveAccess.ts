import { RequestHandler } from "express";
import { ResError, CustomReq } from "../app";
import jwt from "jsonwebtoken";
import Chat from "../models/chat";

export const haveAccessToChatList: RequestHandler = (req, res, next) => {
	const userId = (req as CustomReq).userId;
	Chat.findOne({ memberIds: userId })
		.then((result) => {
			if (!result) {
				throw new Error("this user has not access to this chat!");
			}
			next();
		})
		.catch((err) => {
			next(err);
		});
};

export const haveAccessToAddMember: RequestHandler = (req, res, next) => {
	const userId = (req as CustomReq).userId;
	Chat.findOne({ creatorId: userId })
		.then((result) => {
			if (!result) {
				throw new Error(
					"this user has not right permission to add new members to this chat!"
				);
			}
			next();
		})
		.catch((err) => {
			next(err);
		});
};
