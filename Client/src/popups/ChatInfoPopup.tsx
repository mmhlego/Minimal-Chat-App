import { useState } from "react";
import ChatIcon from "../components/ChatIcon";
import UserItem from "../components/Usertem";
import ChatInfo from "../models/ChatInfo";
import ChatUser from "../models/ChatUser";
import PopupContainer from "./PopupContainer";

type Props = {
	visible: boolean;
	chatInfo: ChatInfo;
	closePopup: () => void;
};

export default function ChatInfoPopup({ visible, chatInfo, closePopup }: Props) {
	const [members, setMembers] = useState<ChatUser[]>([
		{
			Username: "mmhlego",
			AvatarUrl: "https://i.pravatar.cc/200",
			LastSeen: "2023-06-15T12:30:00.000Z"
		},
		{
			Username: "Alireza",
			LastSeen: "2023-06-14T15:30:00.000Z",
			AvatarUrl: ""
		},
		{
			Username: "Ghanbari",
			AvatarUrl: "https://i.pravatar.cc/200",
			LastSeen: "2023-01-15T15:30:00.000Z"
		},
		{
			Username: "Tabani",
			LastSeen: "2023-06-01T15:30:00.000Z",
			AvatarUrl: ""
		},
		{
			Username: "Sample User",
			AvatarUrl: "https://i.pravatar.cc/200",
			LastSeen: "2023-06-11T15:30:00.000Z"
		},
		{
			Username: "Mehdi Okh",
			LastSeen: "2023-06-08T15:30:00.000Z",
			AvatarUrl: ""
		}
	]);

	return (
		<PopupContainer visible={visible} closePopup={closePopup}>
			<div className="bg-white border border-gray-300 shadow-lg rounded-lg p-2 h-1/2 w-11/12 sm:w-1/2 2xl:w-5/12 overflow-y-auto text-black flex flex-col gap-2 dark-scroll">
				<div className="grid grid-rows-2 grid-cols-[3rem_auto] items-center gap-x-1 pl-2 pt-2">
					<ChatIcon name={chatInfo.Name} className="row-span-2 col-span-1 w-11 h-11" />
					<p className="font-semibold">{chatInfo.Name}</p>
					<p className="font-light text-sm">{chatInfo.Type + " Chat"}</p>
				</div>
				<div className="border-b border-gray-500" />
				<p className="text-center pt-1">Members List:</p>
				<div className="flex flex-col">
					{members
						.sort(
							(a, b) =>
								new Date(b.LastSeen).getTime() - new Date(a.LastSeen).getTime()
						)
						.map((member) => (
							<UserItem key={member.Username} info={member} />
						))}
				</div>
			</div>
		</PopupContainer>
	);
}
