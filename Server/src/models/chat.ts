import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user";
import { IMessage } from "./message";

export interface IUnreadMessage extends Document {
	userId: IUser["_id"];
	lastSeenMessage?: IMessage["_id"];
}
export interface IChat extends Document {
	name: string;
	type: "group" | "private";
	memberIds: IUser["_id"][];
	creatorId: IUser["_id"];
	unreadMessageCount: IUnreadMessage[];
	lastMessage?: string;
	lastSendDate?: Date;
}

const chatSchema = new Schema<IChat>({
	name: { type: String },
	type: { type: String, enum: ["group", "private"], default: "private" },
	memberIds: [{ type: Types.ObjectId, ref: "User" }],
	unreadMessageCount: [
		{
			userId: { type: Types.ObjectId, ref: "User" },
			lastSeenMessage: { type: Types.ObjectId, ref: "Message" },
		},
	],
	creatorId: { type: Types.ObjectId, ref: "User", required: true },
	lastMessage: String,
	lastSendDate: Date,
});

export default model<IChat>("Chat", chatSchema);
