import { Schema, model, Document, Types } from "mongoose";
import { IChat } from "./chat";
import { IUser } from "./user";

interface IMessage extends Document {
	chatId: IChat["_id"];
	senderId: IUser["_id"];
	replyTo?: IMessage["_id"];
	body: string;
	sendDate: Date;
}

const chatSchema = new Schema<IMessage>({
	chatId: { type: Types.ObjectId, required: true, ref: "Chat" },
	senderId: { type: Types.ObjectId, required: true, ref: "User" },
	replyTo: { type: Types.ObjectId, ref: "Chat" },
	body: { type: String, required: true },
	sendDate: { type: Date, required: true },
});

export default model<IMessage>("Message", chatSchema);
