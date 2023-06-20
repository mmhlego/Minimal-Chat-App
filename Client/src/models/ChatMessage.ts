import ChatAttachment from "./ChatAttachment";
import ChatUser from "./ChatUser";

export default interface ChatMessage {
	id: string;
	body: string;
	replyTo?: string;
	sendDate: string;
	sender: ChatUser;
	attachment?: ChatAttachment;
}
