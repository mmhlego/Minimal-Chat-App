import { RequestHandler } from "express";
import { CustomReq, ResError } from "../app";
import Chat, { IChat, IUnreadMessage } from "../models/chat";
import User from "../models/user";
import Message from "../models/message";
import { Types } from "mongoose";

export const createChat: RequestHandler = (req, res, next) => {
	const userId = (req as CustomReq).userId;
	const chatName = req.body.name;
	const chatType = req.body.type;
	const chatMembers = req.body.members;
	User.find({ username: { $in: [...chatMembers] } })
		.then((users) => {
			const unreadMessageCount: any[] = [];
			users.forEach((e) => {
				unreadMessageCount.push({
					userId: e._id,
				});
			});
			const chat = new Chat({
				name: chatName,
				type: chatType,
				memberIds: users,
				creatorId: userId,
				unreadMessageCount:
					unreadMessageCount as unknown as IUnreadMessage,
			});
			chat.save();
			users.forEach((user) => {
				user.chatIds = [...user.chatIds, chat._id];
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

export const getChatList: RequestHandler = async (req, res, next) => {
	const userId = (req as CustomReq).userId;
	const user = await User.findOne({ _id: userId }).populate({
		path: "chatIds",
		populate: {
			path: "unreadMessageCount",
			populate: {
				path: "lastSeenMessage",
			},
		},
	});

	if (!user) throw new Error("chat id is not valid!");

	const data = await user.chatIds.reduce(async (accumulator, chat) => {
		let lastSeenDate;
		chat.unreadMessageCount.forEach((e: any) => {
			if (e.userId.equals(new Types.ObjectId(userId))) {
				if (e.lastSeenMessage) {
					lastSeenDate = e.lastSeenMessage.sendDate;
				} else {
					lastSeenDate = new Date();
				}
			}
		});

		const count = await Message.find({
			chatId: chat._id,
			senderId: { $ne: userId },
			sendDate: {
				$gt: lastSeenDate,
			},
		}).count();

		const asyncAcc = await accumulator;
		asyncAcc.push({
			chatId: chat._id,
			name: chat.name,
			type: chat.type,
			unreadMessageCount: count,
			lastMessage: chat.lastMessage,
			lastSendDate: chat.lastSendDate,
		});
		// console.log(accumulator);

		return asyncAcc;
	}, []);

	res.status(200).json({
		status: "success",
		data,
	});
	// .catch((err) => {
	// 	next(err);
	// });
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
	User.find({ username: { $in: [...usernames] } }).then((users) => {
		Chat.findOne({ _id: chatId })
			.then((chat) => {
				if (!chat) throw new Error("chat id is not valid!");

				users.forEach((user) => {
					user.chatIds = [...user.chatIds, chatId];
					chat.memberIds = [...chat.memberIds, user._id];
					chat.save();
					user.save();
				});
			})
			.then(() => {
				res.status(200).json({
					status: "success",
					data: {},
				});
			})
			.catch((err) => {
				next(err);
			});
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
	Chat.findOne({ _id: chatId })
		.then((chat) => {
			if (!chat) throw new Error("chatId is invalid!");
			chat.lastMessage = body;
			chat.lastSendDate = new Date();
			chat.save();

			res.status(200).json({
				status: "success",
				data: {},
			});
		})
		.catch((err) => {
			next(err);
		});
};

export const deleteMessage: RequestHandler = (req, res, next) => {
	const messageId = req.params.messageId;
	Message.deleteOne({ _id: messageId })
		.then(() => {
			res.status(200).json({
				status: "success",
				data: {},
			});
		})
		.catch((err) => {
			next(err);
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
		{ __v: 0 },
		{ sort: { sendDate: -1 }, limit: count }
	)
		.populate("senderId")
		.then((messages) => {
			if (!messages) throw new Error("messageId is invalid!");
			res.status(200).json({
				status: "success",
				data: messages
					.reduce((acc: any[], message) => {
						acc.push({
							id: message._id,
							chatId: message.chatId,
							sender: {
								username: message.senderId.username,
								// email: message.senderId.email,
								// firstName: message.senderId.firstName,
								// lastName: message.senderId.lastName,
								avatarUrl: message.senderId.avatarUrl,
							},
							body: message.body,
							sendDate: message.sendDate,
							replyTo: message.replyTo,
						});
						return acc;
					}, [])
					.reverse(),
			});
		})
		.catch((err) => {
			next(err);
		});
};

export const seenMessage: RequestHandler = (req, res, next) => {
	const messageId = req.params.messageId;
	const chatId = req.params.chatId;
	const userId = (req as CustomReq).userId;
	console.log(userId);

	Chat.updateOne(
		{ _id: chatId, "unreadMessageCount.userId": userId },
		{
			"unreadMessageCount.$.lastSeenMessage": messageId,
		}
	)
		.then((message) => {
			if (!message.matchedCount)
				throw new Error("chatId or userId is invalid!");
			res.status(200).json({
				status: "success",
				data: {},
			});
		})
		.catch((err) => {
			next(err);
		});
};
