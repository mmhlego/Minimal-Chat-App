import ChatAttachment from "./ChatAttachment";
import ChatUser from "./ChatUser";

export default interface ChatMessage {
	id: number;
	body: string;
	replyTo?: number;
	sendDate: string;
	sender: ChatUser;
	attachment?: ChatAttachment;
}
