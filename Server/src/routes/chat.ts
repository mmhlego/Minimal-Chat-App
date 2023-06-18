import { isAuth, login, signup } from "../controllers/auth";
import {
	createChat,
	getChat,
	getChatList,
	getChatMembers,
} from "../controllers/chat";
import { getProfile, updateProfile } from "../controllers/profile";

const express = require("express");

const router = express.Router();

router.post("/chats", isAuth, createChat);

router.get("/chats", isAuth, getChatList);

router.get("/chats/:chatId", isAuth, getChat);

router.get("/chats/:chatId/members", isAuth, getChatMembers);

export default router;
