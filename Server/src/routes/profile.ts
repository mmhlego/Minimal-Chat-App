import { isAuth, login, signup } from "../controllers/auth";
import { getProfile, updateProfile } from "../controllers/profile";

const express = require("express");

const router = express.Router();

router.get("/profile", isAuth, getProfile);

router.put("/profile", isAuth, updateProfile);

export default router;
