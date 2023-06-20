import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import chatRouter from "./routes/chat";
import bodyParser from "body-parser";
import { Server } from "socket.io";

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

			// const token = socket.handshake.auth.token;
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

			// Read message recieved from client.
			socket.on("message_from_client", (data) => {
				console.log("message_from_client: ", data);
			});

			// Send a message to the connected client 5 seconds after the connection is created.
			setTimeout(() => {
				socket.emit("message_from_server", `Message: ${Math.random()}`);
			}, 5_000);

			/**
			 * New code
			 */
			// Get the room number from the client.
			const roomNumber: string = socket.handshake.query
				.roomNumber as string;
			// Join room for specific users.
			const room = `room-userId-${roomNumber}`;
			socket.join(room);

			// Emit to room by room number.
			setTimeout(() => {
				socketIo
					.to(room)
					.emit(
						"room-userId",
						`You are in room number: ${roomNumber}`
					);
			}, 2_000);
		});
	})
	.catch((err) => console.log(err));
