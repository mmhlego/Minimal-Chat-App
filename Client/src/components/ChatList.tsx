import { Add } from "iconsax-react";
import Button from "./Button";
import { useEffect, useState } from "react";
import Header from "./Header";
import ChatInfo from "../models/ChatInfo";
import ChatItem from "./ChatItem";

type Props = {
	selectedChatId?: number;
	openProfile: () => void;
	setChatId: (id: number) => void;
};

export default function ChatList({ selectedChatId, openProfile, setChatId }: Props) {
	const [searchText, setSearchText] = useState("");

	const [chatList, setChatList] = useState<ChatInfo[]>([
		{
			ChatId: 1,
			Name: "Sample Chat",
			UnreadMessageCount: 5,
			LastMessage: "سلام خوبی؟",
			LastSendDate: new Date(2023, 5, 6, 2, 21, 15).toISOString(),
			Type: "Private"
		},
		{
			ChatId: 2,
			Name: "Good Group",
			UnreadMessageCount: 0,
			LastMessage: "چخبرا؟",
			LastSendDate: new Date(2023, 5, 6, 1, 19, 15).toISOString(),
			Type: "Group"
		},
		{
			ChatId: 3,
			Name: "Kelas IOT",
			UnreadMessageCount: 1,
			LastMessage: "سلام",
			LastSendDate: new Date(2022, 5, 5, 12, 21, 15).toISOString(),
			Type: "Private"
		},
		{
			ChatId: 4,
			Name: "Mehdi Okhravi",
			UnreadMessageCount: 0,
			Type: "Private"
		}
	]);

	const [filteredList, setFilteredList] = useState<ChatInfo[]>([]);

	useEffect(() => {
		setFilteredList(
			chatList.filter((c) => c.Name.toLowerCase().includes(searchText.toLowerCase()))
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
