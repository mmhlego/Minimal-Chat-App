import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	avatarUrl?: string;
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	avatarUrl: String,
});

export default model<IUser>("User", userSchema);
