import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user";

export interface IChat extends Document {
	name: string;
	type: "group" | "private";
	memberIds: IUser["_id"][];
	creatorId: IUser["_id"];
	// unreadMessageCount: number,
	lastMessage?: string;
	lastSendDate?: Date;
}

const chatSchema = new Schema<IChat>({
	name: { type: String },
	type: { type: String, enum: ["group", "private"], default: "private" },
	memberIds: [{ type: Types.ObjectId, ref: "User" }],
	creatorId: { type: Types.ObjectId, ref: "User", required: true },
	lastMessage: String,
	lastSendDate: Date,
});

export default model<IChat>("Chat", chatSchema);
