import axios from "axios";
import { ResponseWrapper } from "../models/ResponseWrapper";
import User from "../models/User";

export async function Register(
	username: string,
	password: string,
	email: string,
	firstName: string,
	lastName: string,
	avatarUrl: string
): Promise<ResponseWrapper<string>> {
	const response = await axios.post("/register", {
		username,
		password,
		email,
		firstName,
		lastName,
		avatarUrl
	});
	return response.data;
}

interface IJwtResponse {
	jwt: string;
}
export async function Login(
	username: string,
	password: string
): Promise<ResponseWrapper<IJwtResponse>> {
	const response = await axios.post("/login", {
		username,
		password
	});
	return response.data;
}

export async function GetProfile(): Promise<ResponseWrapper<User>> {
	const response = await axios.get("/profile");
	return response.data;
}

export async function UpdateProfile(
	username: string,
	email: string,
	firstName: string,
	lastName: string,
	avatarUrl?: string
): Promise<ResponseWrapper<string>> {
	const response = await axios.put("/", {
		username,
		email,
		firstName,
		lastName,
		avatarUrl
	});
	return response.data;
}
