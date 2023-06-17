import axios, { AxiosProgressEvent } from "axios";
import { ResponseWrapper } from "../models/ResponseWrapper";
import ChatInfo, { ChatTypes } from "../models/ChatInfo";
import ChatUser from "../models/ChatUser";
import ChatMessage from "../models/ChatMessage";

export async function ChatsList(): Promise<ResponseWrapper<ChatInfo[]>> {
	const response = await axios.get(`/chats`);
	return response.data;
}

export async function NewChat(
	name: string,
	type: ChatTypes,
	members: string[]
): Promise<ResponseWrapper<string>> {
	const response = await axios.post(`/chats`, { name, type, members });
	return response.data;
}

export async function GetChatInfo(chatId: number): Promise<ResponseWrapper<ChatInfo>> {
	const response = await axios.get(`/chats/${chatId}`);
	return response.data;
}

export async function ChatSeen(chatId: number): Promise<ResponseWrapper<string>> {
	const response = await axios.put(`/chats/${chatId}/seen`);
	return response.data;
}

export async function GetChatMembers(chatId: number): Promise<ResponseWrapper<ChatUser[]>> {
	const response = await axios.get(`/chats/${chatId}/members`);
	return response.data;
}

export async function AddChatMembers(
	chatId: number,
	username: string
): Promise<ResponseWrapper<ChatUser[]>> {
	const response = await axios.post(`/chats/${chatId}/members`, { username });
	return response.data;
}

export async function GetChatHistory(
	chatId: number,
	date: string,
	count: number
): Promise<ResponseWrapper<ChatMessage[]>> {
	const response = await axios.put(`/chats/${chatId}/history`, {
		date,
		count
	});
	return response.data;
}

export async function GetChatMessage(
	chatId: number,
	messageId: string
): Promise<ResponseWrapper<ChatMessage[]>> {
	const response = await axios.get(`/chats/${chatId}/messages/${messageId}`);
	return response.data;
}

export async function DeleteChatMessage(
	chatId: number,
	messageId: number
): Promise<ResponseWrapper<string>> {
	const response = await axios.delete(`/chats/${chatId}/messages/${messageId}`);
	return response.data;
}

export async function UploadFile(
	file: File,
	onUploadProgress: (progressEvent: AxiosProgressEvent) => void
): Promise<ResponseWrapper<string>> {
	const formData = new FormData();
	formData.append(file.name, file);

	const response = await axios.post(`/attachments`, formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		},
		onUploadProgress: onUploadProgress
	});
	return response.data;
}
