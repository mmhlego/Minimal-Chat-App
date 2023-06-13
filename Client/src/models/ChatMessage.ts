import ChatAttachment from "./ChatAttachment";
import ChatUser from "./ChatUser";

export default interface ChatMessage {
	Id: number;
	Body: string;
	ReplyTo?: number;
	SendDate: string;
	Sender: ChatUser;
	Attachments: ChatAttachment[];
}
