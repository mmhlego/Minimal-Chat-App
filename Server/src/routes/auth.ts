import { login, signup } from "../controllers/auth";

const express = require("express");

const router = express.Router();

router.post("/register", signup);

router.post("/login", login);

export default router;
