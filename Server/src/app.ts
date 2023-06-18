import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import chatRouter from "./routes/chat";
import bodyParser from "body-parser";

export interface ResError extends Error {
	status?: number;
}

export interface CustomReq extends Request {
	userId: string;
}

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());
app.use(authRouter);
app.use(profileRouter);
app.use(chatRouter);

app.use(
	(error: ResError, _req: Request, res: Response, _next: NextFunction) => {
		const status = error.status || 500;
		const message = error.message;
		res.status(status).json({ status: "error", data: message });
	}
);

mongoose
	.connect(
		"mongodb+srv://admin:PPkvLoUuzZsd9b8j@cluster0.nvbpkxk.mongodb.net/?retryWrites=true&w=majority"
	)
	.then((result) => {
		app.listen(port, () => {
			console.log(`[Server]: I am running at http://localhost:${port}`);
		});
	})
	.catch((err) => console.log(err));
