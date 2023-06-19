import { getProfile, updateProfile } from "../controllers/profile";
import isAuth from "../middlewares/isAuth";

const express = require("express");

const router = express.Router();

router.get("/profile", isAuth, getProfile);

router.put("/profile", isAuth, updateProfile);

export default router;
