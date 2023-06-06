import { twMerge } from "tailwind-merge";
import ChatInfo from "../models/ChatInfo";
import ChatIcon from "./ChatIcon";
import moment from "moment";

type Props = {
	info: ChatInfo;
	selectedId?: number;
	select: (id: number) => void;
};

export default function ChatItem({ info, selectedId, select }: Props) {
	return (
		<div
			className={twMerge(
				"h-14 border-b-2 border-gray-300 grid grid-rows-2 items-center gap-x-1 px-2 py-1 grid-cols-[2.75rem_auto_6rem] cursor-pointer duration-200",
				selectedId === info.ChatId ? "bg-gray-200" : ""
			)}
			onClick={() => select(info.ChatId)}>
			<ChatIcon name={info.Name} />
			<p className="font-medium">{info.Name}</p>
			<p className="font-light text-xs text-right">
				{info.LastSendDate ? moment(new Date(info.LastSendDate!).getTime()).fromNow() : ""}
			</p>
			<p className={twMerge("text-sm font-light", info.LastMessage ? "" : "italic")}>
				{info.LastMessage ? info.LastMessage : "No Messages ..."}
			</p>
			{info.UnreadMessageCount > 0 && (
				<div className="w-5 h-5 rounded-full bg-cyan text-white text-center text-sm font-light place-self-end">
					{info.UnreadMessageCount}
				</div>
			)}
		</div>
	);
}
