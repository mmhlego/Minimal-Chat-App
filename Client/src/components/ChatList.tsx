import { useQuery } from "@tanstack/react-query";
import { Add } from "iconsax-react";
import { useEffect, useState } from "react";
import { GetChatsList } from "../api/ChatApis";
import ChatInfo from "../models/ChatInfo";
import Button from "./Button";
import ChatItem from "./ChatItem";
import Header from "./Header";
import { toast } from "react-toastify";

type Props = {
	selectedChatId?: string;
	openProfile: () => void;
	setChatId: (id: string) => void;
};

export default function ChatList({ selectedChatId, openProfile, setChatId }: Props) {
	const [searchText, setSearchText] = useState("");

	const [chatList, setChatList] = useState<ChatInfo[]>([]);
	const [filteredList, setFilteredList] = useState<ChatInfo[]>([]);

	const { data: _ } = useQuery(["chats"], () => GetChatsList(), {
		cacheTime: 0,
		refetchInterval: 1000,
		onSuccess(res) {
			if (res.status === "success") {
				setChatList(res.data);
			} else {
				toast.error("An error occurred while loading chat list", {
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: false,
					pauseOnHover: false
				});
			}
		}
	});

	useEffect(() => {
		setFilteredList(
			chatList.filter((c) => c.name.toLowerCase().includes(searchText.toLowerCase()))
		);
	}, [chatList, searchText]);

	return (
		<div className="relative h-screen min-h-min flex flex-col">
			<Header openProfile={openProfile} setSearchText={setSearchText} />
			<NewChatButton />

			<div className="w-full h-full overflow-y-auto blue-scroll">
				{filteredList.length === 0 && (
					<p className="text-center p-4 italic">No Chats Were Found ...</p>
				)}
				{filteredList.map((chat, i) => (
					<ChatItem key={i} info={chat} select={setChatId} selectedId={selectedChatId} />
				))}
			</div>
		</div>
	);
}

function NewChatButton() {
	return (
		<Button className="p-1 rounded-full absolute right-4 bottom-4" accent="cyan">
			<Add variant="Outline" size={36} />
		</Button>
	);
}
