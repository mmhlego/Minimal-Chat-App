import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import chatRouter from "./routes/chat";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import Chat from "./models/chat";
import Message from "./models/message";
import jwt from "jsonwebtoken";

export interface ResError extends Error {
	status?: number;
}

export interface CustomReq extends Request {
	userId: string;
}

const app: Express = express();
const port = 3000;

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
});

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
		const server = app.listen(port, () => {
			console.log(`[Server]: I am running at http://localhost:${port}`);
		});
		const socketIo = new Server(server, {
			cors: {
				origin: "*", // Allow any origin for testing purposes. This should be changed on production.
			},
		});

		socketIo.on("connection", (socket) => {
			console.log("New connection created");
			socket.emit("message_from_server", `You joined to the socket!`);

			const token = socket.handshake.auth.token;

			const tok = token.split(" ")[1];
			let decodedToken: any;
			try {
				decodedToken = jwt.verify(tok, "somesupersecretsecret");
			} catch (err: any) {
				socket.disconnect();
			}
			if (!decodedToken) {
				socket.disconnect();
			}

			// console.log('Auth token', token);

			// try {
			//   // Verify the token here and get user info from JWT token.
			// } catch (error) {
			//   socket.disconnect(true);
			// }

			// A client is disconnected.
			socket.on("disconnect", () => {
				console.log("A user disconnected");
			});

			// Get the room number from the client.
			const roomNumber: string | undefined = socket.handshake.query
				.roomNumber as string;
			// Join room for specific users.
			const room = `room-userId-${roomNumber}`;
			socket.join(room);

			socket.on("join-conversation", (roomId: string | null) => {
				console.log("join-conversation", roomId);
				if (roomId) socket.join(`room-userId-${roomId}`);
			});

			socket.on("leave-conversation", (roomId: string | null) => {
				console.log("leave-conversation", roomId);
				if (roomId) socket.leave(`room-userId-${roomId}`);
			});

			/**
			 * New code
			 */

			socket.on(
				"send-message",
				(body: string, chatId: string, replyId?: string) => {
					const message = new Message({
						chatId: chatId,
						senderId: (decodedToken as { userId: string }).userId,
						replyTo: replyId,
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
							socketIo.to(room).emit("receive-message", message);
						})
						.catch((err) => {});
					console.log("new message", { body, replyId });
				}
			);
		});
	})
	.catch((err) => console.log(err));
