import { isAuth, login, signup } from "../controllers/auth";
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

const express = require("express");

const router = express.Router();

router.post("/chats", isAuth, createChat);

router.get("/chats", isAuth, getChatList);

router.get("/chats/:chatId", isAuth, getChat);

router.get("/chats/:chatId/members", isAuth, getChatMembers);

router.post("/chats/:chatId/members", isAuth, addChatMember);

router.post("/chats/:chatId/messages", isAuth, sendMessage);

router.delete("/chats/:chatId/messages/:messageId", isAuth, deleteMessage);

router.get("/chats/:chatId/messages/:messageId", isAuth, getMessage);

router.post("/chats/:chatId/history", isAuth, getChatHistory);

export default router;
