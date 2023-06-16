import { twMerge } from "tailwind-merge";
import ChatIcon from "./ChatIcon";
import moment from "moment";
import ChatUser from "../models/ChatUser";

type Props = {
	info: ChatUser;
};

export default function UserItem({ info }: Props) {
	return (
		<div
			className={twMerge(
				"h-14 border-t border-gray-200 flex items-center gap-x-2 px-2 py-1 duration-200 cursor-pointer hover:bg-gray-100"
			)}>
			{info.AvatarUrl ? (
				<img
					className={twMerge("h-9 w-9 rounded-full border border-gray-200")}
					src={info.AvatarUrl}
				/>
			) : (
				<ChatIcon name={info.Username} className="h-9 w-9 text-base self-center" />
			)}
			<p className="font-normal">{info.Username}</p>
			<p className="font-light text-xs ml-auto">
				{moment(new Date(info.LastSeen).getTime()).fromNow()}
			</p>
		</div>
	);
}
