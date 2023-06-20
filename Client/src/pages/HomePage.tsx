import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { twMerge } from "tailwind-merge";
import ChatList from "../components/ChatList";
import ChatSection from "../components/ChatSection";
import CreateChatPopup from "../popups/CreateChatPopup";
import ProfilePopup from "../popups/ProfilePopup";

export default function HomePage() {
	const [selectedChat, setSelectedChat] = useState<string | undefined>(undefined);
	const [profileVisible, setProfileVisible] = useState(false);
	const [createVisible, setCreateVisible] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("jwt");

		if (!token) {
			navigate("/login");
		}
	}, []);

	useLayoutEffect(() => {
		const token = localStorage.getItem("jwt");

		if (token) {
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		}
	}, []);

	const socketIo = io("http://localhost:3000", {
		auth: {
			token: localStorage.getItem("jwt")
		},
		query: {
			roomNumber: selectedChat
		}
	});

	const selectChat = (id: string | undefined) => {
		setSelectedChat((prev) => {
			socketIo.emit("leave-conversation", prev);
			socketIo.emit("join-conversation", id);

			return id;
		});
	};

	const sendMessage = (body: string, replyId?: string) => {
		socketIo.emit("send-message", selectedChat, body, replyId);
	};

	return (
		<div
			className="w-screen h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_2fr]"
			onContextMenu={(e) => e.preventDefault()}>
			<ChatList
				openProfile={() => setProfileVisible(true)}
				openCreateChat={() => setCreateVisible(true)}
				setChatId={selectChat}
				selectedChatId={selectedChat}
			/>

			<ChatSection
				chatId={selectedChat}
				back={() => selectChat(undefined)}
				sendMessage={sendMessage}
				socketIo={socketIo}
				className={twMerge(
					"w-full h-screen absolute md:relative",
					selectedChat !== undefined ? "left-0" : "left-[100vw] md:left-0"
				)}
			/>

			<ProfilePopup visible={profileVisible} closePopup={() => setProfileVisible(false)} />

			<CreateChatPopup visible={createVisible} closePopup={() => setCreateVisible(false)} />
		</div>
	);
}
