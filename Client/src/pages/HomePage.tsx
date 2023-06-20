import { useState } from "react";
import ChatSection from "../components/ChatSection";
import { twMerge } from "tailwind-merge";
import ChatList from "../components/ChatList";
import ProfilePopup from "../popups/ProfilePopup";
import { io } from "socket.io-client";

export default function HomePage() {
	const [selectedChat, setSelectedChat] = useState<string | undefined>(undefined);
	const [profileVisible, setProfileVisible] = useState(false);

	const socketIo = io("http://localhost:3000", {
		// auth: { //TODO
		// 	token: "json-web-token"
		// },
		query: {
			// roomNumber: document.getElementById("roomId").value // <- new code
			roomNumber: selectedChat
		}
	});

	const selectChat = (id: string | undefined) => {
		setSelectedChat((prev) => {
			if (prev !== undefined) {
			}

			if (id !== undefined) {
			}

			return id;
		});
	};

	return (
		<div
			className="w-screen h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_2fr]"
			onContextMenu={(e) => e.preventDefault()}>
			<ChatList
				openProfile={() => setProfileVisible(true)}
				setChatId={selectChat}
				selectedChatId={selectedChat}
			/>

			<ChatSection
				chatId={selectedChat}
				back={() => selectChat(undefined)}
				className={twMerge(
					"w-full h-screen absolute md:relative",
					selectedChat !== undefined ? "left-0" : "left-[100vw] md:left-0"
				)}
			/>

			<ProfilePopup visible={profileVisible} closePopup={() => setProfileVisible(false)} />
		</div>
	);
}
