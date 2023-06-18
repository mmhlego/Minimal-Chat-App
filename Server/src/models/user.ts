import { Schema, model, Document, Types } from "mongoose";
import { IChat } from "./chat";

export interface IUser extends Document {
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	avatarUrl?: string;
	lastSeen: Date;
	chatIds: IChat["_id"][];
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	avatarUrl: String,
	lastSeen: { type: Date },
	chatIds: [{ type: Types.ObjectId, ref: "Chat" }],
});

export default model<IUser>("User", userSchema);
