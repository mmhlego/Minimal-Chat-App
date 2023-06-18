import { useState } from "react";
import ChatSection from "../components/ChatSection";
import { twMerge } from "tailwind-merge";
import ChatList from "../components/ChatList";
import ProfilePopup from "../popups/ProfilePopup";

export default function HomePage() {
	const [selectedChat, setSelectedChat] = useState(-1);
	const [profileVisible, setProfileVisible] = useState(false);

	return (
		<div
			className="w-screen h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_2fr]"
			onContextMenu={(e) => e.preventDefault()}>
			<ChatList
				openProfile={() => setProfileVisible(true)}
				setChatId={setSelectedChat}
				selectedChatId={selectedChat}
			/>

			<ChatSection
				chatId={selectedChat}
				back={() => setSelectedChat(-1)}
				className={twMerge(
					"w-full h-screen absolute md:relative",
					selectedChat !== -1 ? "left-0" : "left-[100vw] md:left-0"
				)}
			/>

			<ProfilePopup visible={profileVisible} closePopup={() => setProfileVisible(false)} />
		</div>
	);
}
