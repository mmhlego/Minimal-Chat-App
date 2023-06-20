import { useQuery } from "@tanstack/react-query";
import { Back } from "iconsax-react";
import { twMerge } from "tailwind-merge";
import { GetChatMessage } from "../api/ChatApis";
import ChatMessage from "../models/ChatMessage";
import Loading from "./Loading";
import { ChatTypes } from "../models/ChatInfo";

type Props = {
	chatId: string;
	chatType: ChatTypes;
	message: ChatMessage;
	fromUser: boolean;
	selectMessage: (index: string) => void;
};

export default function Message({ chatId, chatType, message, fromUser, selectMessage }: Props) {
	const fromUserStyle =
		"self-end text-gray-700 before:-right-2 before:-top-[1px] before:border-t-white before:border-l-white rounded-tr-none";
	const otherUserStyle =
		"self-start bg-blue text-gray-200 before:-left-2 before:top-0 before:border-t-blue before:border-r-blue rounded-ss-none";

	const replyFromUserStyle = "bg-gray-100 text-gray-400 border border-gray-300 rounded-se";
	const replyOtherUserStyle = "bg-white/20 text-white border border-white/50 rounded-ss";

	const { data: replyMessage } = useQuery(
		[message.replyTo],
		() => GetChatMessage(chatId, message.replyTo!),
		{
			enabled: message.replyTo !== null && message.replyTo !== undefined
		}
	);

	return (
		<div
			id={message.id.toString()}
			className={twMerge(
				"bg-white p-2 w-fit rounded-2xl relative border border-white/20 shadow-lg max-w-[95%] duration-300",
				"before:absolute before:border-4 before:border-transparent before:z-30",
				fromUser ? fromUserStyle : otherUserStyle
			)}
			onContextMenu={(e) => {
				e.preventDefault();
				selectMessage(message.id);
			}}>
			{message.replyTo && (
				<div
					className={twMerge(
						"gap-4 italic text-sm text-center ellipsis px-2 py-1 rounded-t-xl rounded-b -mt-1 mb-1 -mx-1",
						fromUser ? replyFromUserStyle : replyOtherUserStyle
					)}>
					{replyMessage?.status === "success" ? (
						<>
							<Back className="inline-block mr-2 -mt-1" size={20} />
							{replyMessage.data.body}
						</>
					) : (
						<Loading className="inline-block w-4 h-4 -mb-1" size="small" />
					)}
				</div>
			)}
			<p>{message.body}</p>
		</div>
	);
}
