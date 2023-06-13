import { twMerge } from "tailwind-merge";
import ChatMessage from "../models/ChatMessage";

type Props = {
	message: ChatMessage;
	fromUser: boolean;
	selectMessage: (index: number) => void;
};

export default function Message({ message, fromUser, selectMessage }: Props) {
	const fromUserStyle =
		"self-end text-gray-700 before:-right-2 before:-top-[1px] before:border-t-white before:border-l-white rounded-tr-none";
	const otherUserStyle =
		"self-start bg-blue text-gray-200 before:-left-2 before:top-0 before:border-t-blue before:border-r-blue rounded-ss-none";
	return (
		<div
			id={message.Id.toString()}
			className={twMerge(
				"bg-white p-2 w-fit rounded-2xl relative border border-white/20 shadow-lg max-w-[95%]",
				"before:absolute before:border-8 before:border-transparent",
				fromUser ? fromUserStyle : otherUserStyle
			)}
			onContextMenu={(e) => {
				e.preventDefault();
				selectMessage(message.Id);
			}}>
			{message.Body}
		</div>
	);
}
