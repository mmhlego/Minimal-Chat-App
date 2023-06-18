import { RequestHandler } from "express";
import { CustomReq, ResError } from "../app";
import Chat, { IChat } from "../models/chat";
import User from "../models/user";

export const createChat: RequestHandler = (req, res, next) => {
	const chatName = req.body.name;
	const chatType = req.body.type;
	const chatMembers = req.body.members;
	User.find({ username: { $in: [...chatMembers] } })
		.then((users) => {
			const chat = new Chat({
				name: chatName,
				type: chatType,
				memberIds: users,
			});
			chat.save();
			users.forEach((user) => {
				user.chatIds = chat._id;
				user.save();
			});

			res.status(200).json({
				status: "success",
				data: {},
			});
		})
		.catch((err) => {
			next(err);
		});
};

export const getChatList: RequestHandler = (req, res, next) => {
	const userId = (req as CustomReq).userId;
	User.findOne({ _id: userId })
		.populate("chatIds")
		.then((user) => {
			if (!user) throw new Error("chat id is not valid!");
			res.status(200).json({
				status: "success",
				data: user.chatIds.reduce((accumulator, chat) => {
					accumulator.push({
						chatId: chat._id,
						name: chat.name,
						type: chat.type,
						// unreadMessageCount: ,
						lastMessage: chat.lastMessage,
						lastSendDate: chat.lastSendDate,
					});
					return accumulator;
				}, []),
			});
		})
		.catch((err) => {
			next(err);
		});
};
export const getChat: RequestHandler = (req, res, next) => {
	const chatId = req.params.chatId;
	Chat.findOne({ _id: chatId })
		.then((chat) => {
			if (!chat) throw new Error("chat id is not valid!");
			res.status(200).json({
				status: "success",
				data: {
					chatId: chat._id,
					name: chat.name,
					type: chat.type,
					// unreadMessageCount: ,
					lastMessage: chat.lastMessage,
					lastSendDate: chat.lastSendDate,
				},
			});
		})
		.catch((err) => {
			next(err);
		});
};
export const getChatMembers: RequestHandler = (req, res, next) => {
	const chatId = req.params.chatId;
	Chat.findOne({ _id: chatId })
		.populate("memberIds")
		.then((chat) => {
			if (!chat) throw new Error("chat id is not valid!");
			res.status(200).json({
				status: "success",
				data: chat.memberIds.reduce((accumulator, user) => {
					accumulator.push({
						username: user.username,
						avatarUrl: user.avatarUrl,
						lastSeen: user.lastSeen,
					});
					return accumulator;
				}, []),
			});
		})
		.catch((err) => {
			next(err);
		});
};
