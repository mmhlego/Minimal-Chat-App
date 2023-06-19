import { RequestHandler } from "express";
import { CustomReq, ResError } from "../app";
import Chat, { IChat } from "../models/chat";
import User from "../models/user";
import Message from "../models/message";

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

export const addChatMember: RequestHandler = (req, res, next) => {
	const chatId = req.params.chatId;
	const usernames = req.body.members;
	User.find({ username: { $in: [...usernames] } })
		.then((users) => {
			Chat.findOne({ _id: chatId }).then((chat) => {
				if (!chat) throw new Error("chat id is not valid!");

				users.forEach((user) => {
					user.chatIds = [...user.chatIds, chatId];
					chat.memberIds = [...chat.memberIds, user._id];
					chat.save();
					user.save();
				});
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

export const sendMessage: RequestHandler = (req, res, next) => {
	const chatId = req.params.chatId;
	const replyTo = req.body.replyTo;
	const body = req.body.body;
	const message = new Message({
		chatId: chatId,
		senderId: (req as CustomReq).userId,
		replyTo: replyTo,
		body: body,
		sendDate: new Date(),
	});
	message.save();

	res.status(200).json({
		status: "success",
		data: {},
	});
};

export const deleteMessage: RequestHandler = (req, res, next) => {
	const messageId = req.params.messageId;
	Message.deleteOne({ _id: messageId }).catch((err) => {
		next(err);
	});

	res.status(200).json({
		status: "success",
		data: {},
	});
};
export const getMessage: RequestHandler = (req, res, next) => {
	const messageId = req.params.messageId;
	Message.findOne({ _id: messageId }, { _id: 0, __v: 0 })
		.then((message) => {
			if (!message) throw new Error("messageId is invalid!");
			res.status(200).json({
				status: "success",
				data: message,
			});
		})
		.catch((err) => {
			next(err);
		});
};

export const getChatHistory: RequestHandler = (req, res, next) => {
	const chatId = req.params.chatId;
	const date = req.body.date;
	const count = req.body.count;
	Message.find(
		{ $and: [{ chatId }, { sendDate: { $lt: date } }] },
		{ _id: 0, __v: 0 },
		{ sort: { sendDate: 0 }, limit: count }
	)
		.then((messages) => {
			if (!messages) throw new Error("messageId is invalid!");
			res.status(200).json({
				status: "success",
				data: messages,
			});
		})
		.catch((err) => {
			next(err);
		});
};
