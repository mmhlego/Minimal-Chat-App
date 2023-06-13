export default interface ChatInfo {
	ChatId: number;
	Name: string;
	UnreadMessageCount: number;
	LastMessage?: string;
	LastSendDate?: string;
	Type: ChatTypes;
}

export type ChatTypes = "Group" | "Private";
