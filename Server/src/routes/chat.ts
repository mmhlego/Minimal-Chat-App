import {
	addChatMember,
	createChat,
	deleteMessage,
	getChat,
	getChatHistory,
	getChatList,
	getChatMembers,
	getMessage,
	sendMessage,
} from "../controllers/chat";
import {
	haveAccessToAddMember,
	haveAccessToChatList,
} from "../middlewares/haveAccess";
import isAuth from "../middlewares/isAuth";

const express = require("express");

const router = express.Router();

router.post("/chats", isAuth, createChat);

router.get("/chats", isAuth, getChatList);

router.get("/chats/:chatId", isAuth, haveAccessToChatList, getChat);

router.get(
	"/chats/:chatId/members",
	isAuth,
	haveAccessToChatList,
	getChatMembers
);

router.post(
	"/chats/:chatId/members",
	isAuth,
	haveAccessToAddMember,
	addChatMember
);

router.post(
	"/chats/:chatId/messages",
	isAuth,
	haveAccessToChatList,
	sendMessage
);

router.delete(
	"/chats/:chatId/messages/:messageId",
	isAuth,
	haveAccessToChatList,
	deleteMessage
);

router.get(
	"/chats/:chatId/messages/:messageId",
	isAuth,
	haveAccessToChatList,
	getMessage
);

router.post(
	"/chats/:chatId/history",
	isAuth,
	haveAccessToChatList,
	getChatHistory
);

export default router;
