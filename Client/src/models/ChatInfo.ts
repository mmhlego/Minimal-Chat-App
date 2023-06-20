export default interface ChatInfo {
	chatId: string;
	name: string;
	unreadMessageCount: number;
	lastMessage?: string;
	lastSendDate?: string;
	type: ChatTypes;
}

export type ChatTypes = "Group" | "Private";
