import { useState } from "react";
import ChatSection from "../components/ChatSection";
import { twMerge } from "tailwind-merge";
import ChatList from "../components/ChatList";

export default function HomePage() {
	const [selectedChat, setSelectedChat] = useState(-1);

	return (
		<div className="w-screen h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_2fr]">
			<ChatList setChatId={setSelectedChat} selectedChatId={selectedChat} />

			<ChatSection
				chatId={selectedChat}
				back={() => setSelectedChat(-1)}
				className={twMerge(
					"w-full h-full absolute md:relative duration-500",
					selectedChat ? "left-0" : "left-[100vw] md:left-0"
				)}
			/>
		</div>
	);
}
