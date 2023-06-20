export default interface ChatInfo {
	chatId: number;
	name: string;
	unreadMessageCount: number;
	lastMessage?: string;
	lastSendDate?: string;
	type: ChatTypes;
}

export type ChatTypes = "Group" | "Private";
