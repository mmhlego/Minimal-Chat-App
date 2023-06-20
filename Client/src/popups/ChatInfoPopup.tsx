import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { GetChatMembers } from "../api/ChatApis";
import ChatIcon from "../components/ChatIcon";
import UserItem from "../components/Usertem";
import ChatInfo from "../models/ChatInfo";
import PopupContainer from "./PopupContainer";
import Loading from "../components/Loading";

type Props = {
	visible: boolean;
	chatInfo: ChatInfo;
	closePopup: () => void;
};

export default function ChatInfoPopup({ visible, chatInfo, closePopup }: Props) {
	const { data: members, isLoading: membersLoading } = useQuery(
		[`${chatInfo.chatId}-members`],
		() => GetChatMembers(chatInfo.chatId),
		{
			cacheTime: 0,
			onError() {
				closePopup();
				toast.error("An error occurred while loading chat info", {
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: false,
					pauseOnHover: false
				});
			}
		}
	);

	return (
		<PopupContainer visible={visible} closePopup={closePopup}>
			<div className="bg-white border border-gray-300 shadow-lg rounded-lg p-2 h-1/2 w-11/12 sm:w-1/2 2xl:w-5/12 overflow-y-auto text-black flex flex-col gap-2 dark-scroll">
				<div className="grid grid-rows-2 grid-cols-[3rem_auto] items-center gap-x-1 pl-2 pt-2">
					<ChatIcon name={chatInfo.name} className="row-span-2 col-span-1 w-11 h-11" />
					<p className="font-semibold">{chatInfo.name}</p>
					<p className="font-light text-sm">{chatInfo.type + " Chat"}</p>
				</div>
				<div className="border-b border-gray-500" />
				<p className="text-center pt-1">Members List:</p>
				{membersLoading && <Loading className="self-center mt-16" />}
				<div className="flex flex-col">
					{members?.data
						.sort(
							(a, b) =>
								new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
						)
						.map((member) => (
							<UserItem key={member.username} info={member} />
						))}
				</div>
			</div>
		</PopupContainer>
	);
}
