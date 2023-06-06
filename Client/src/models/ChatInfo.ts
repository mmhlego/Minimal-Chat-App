export default interface ChatInfo {
	ChatId: number;
	Name: string;
	UnreadMessageCount: number;
	LastMessage?: string;
	LastSendDate?: string;
	Type: "Group" | "Chat";
}
