import { RequestHandler } from "express";
import { CustomReq } from "../app";
import Message from "../models/message";

export const isRelatedToChat: RequestHandler = (req, res, next) => {
	const messageId = req.params.messageId;
	const chatId = req.params.chatId;
	Message.findOne({ _id: messageId, chatId })
		.then((result) => {
			console.log(result);
			if (!result) {
				throw new Error("this message is not belong to this chat!");
			}
			next();
		})
		.catch((err) => {
			next(err);
		});
};
