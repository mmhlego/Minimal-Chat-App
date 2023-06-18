import { useMutation, useQuery } from "@tanstack/react-query";
import {
	ArrowDown2,
	AttachCircle,
	Back,
	BackSquare,
	CloseCircle,
	Copy,
	Send,
	TrushSquare
} from "iconsax-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { DeleteChatMessage, GetChatHistory, GetChatInfo } from "../api/ChatApis";
import { useIsVisible } from "../hooks/UseIsVisible";
import ChatMessage from "../models/ChatMessage";
import ChatInfoPopup from "../popups/ChatInfoPopup";
import { scrollToEnd } from "../utils/ScrollUtils";
import Button from "./Button";
import ChatIcon from "./ChatIcon";
import Loading from "./Loading";
import Message from "./Message";

type Props = {
	chatId: number;
	back: () => void;
	className?: string;
};

export default function ChatSection({ chatId, back, className }: Props) {
	// Chat Body
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	// Message States
	const [newMessage, setNewMessage] = useState("");
	const [replyMessage, setReplyMessage] = useState<ChatMessage | undefined>(undefined);

	const [endRef, endIsVisible] = useIsVisible<HTMLDivElement>();
	const [historyRef, historyIsVisible] = useIsVisible<HTMLDivElement>();
	const [historyDate, setHistoryDate] = useState<string>(new Date().toUTCString());
	const [historyAvailable, setHistoryAvailable] = useState(true);

	// Context Menu
	const [selectedMessage, setSelectedMessage] = useState(-1);
	const [contextVisible, setContextVisible] = useState(false);
	const contextPos = useMemo(() => {
		const component = document.getElementById(selectedMessage.toString());
		if (!component) return { x: undefined, y: undefined };

		const y = Math.max(component.getBoundingClientRect().top, 60) + 5;
		const x = component.getBoundingClientRect().left + 5;

		setContextVisible(true);
		return { x, y };
	}, [selectedMessage]);

	// Popups
	const [chatInfoVisible, setChatInfoVisible] = useState(true);

	// Apis // TODO
	const { data: chatInfo } = useQuery([chatId], () => GetChatInfo(chatId), {
		onSuccess(data) {
			if (data.Status === "Error")
				toast.error("An error occurred while loading your profile info", {
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: false,
					pauseOnHover: false
				});
		},
		onError() {
			toast.error("An error occurred while loading your profile info", {
				position: "bottom-right",
				autoClose: 3000,
				closeOnClick: false,
				pauseOnHover: false
			});
		}
	});

	const loadCount = 10;
	const { data: _, refetch: loadHistory } = useQuery(
		[`${chatId}-${historyDate}`],
		() => GetChatHistory(chatId, historyDate, loadCount),
		{
			onSuccess(res) {
				if (res.Status === "Error") {
					toast.error("An error occurred while loading chat history", {
						position: "bottom-right",
						autoClose: 3000,
						closeOnClick: false,
						pauseOnHover: false
					});
					return;
				}

				setMessages((m) => [...res.Data, ...m]);

				if (loadCount !== res.Data.length) {
					setHistoryAvailable(false);
				} else {
					setHistoryDate(res.Data[0].SendDate);
				}
			},
			onError() {
				toast.error("An error occurred while loading chat history", {
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: false,
					pauseOnHover: false
				});
			},
			enabled: !!chatInfo
		}
	);

	const { mutate: deleteSelectedMessage } = useMutation(
		() => DeleteChatMessage(chatId, selectedMessage),
		{
			onSuccess() {
				const component = document.getElementById(selectedMessage.toString());
				if (component) {
					component.style.opacity = "0";
					component.style.marginTop = `-${component.clientHeight}px`;

					component
						.animate([], {
							duration: 300,
							iterations: 1
						})
						.finished.then(() => {
							messages.splice(
								messages.findIndex((v) => v.Id === selectedMessage),
								1
							);
							console.log(1213);
						});
				}

				toast.success("Message deleted successfully", {
					position: "bottom-right",
					autoClose: 1000
				});
			},
			onError() {
				toast.error("An error ocurred", {
					position: "bottom-right",
					autoClose: 1000
				});
			}
		}
	);

	const sendMessage = () => {
		const body = newMessage.trim();
		setNewMessage("");
		setReplyMessage(undefined);

		const message: ChatMessage = {
			Id: messages.length + 1,
			Body: body,
			SendDate: new Date().toUTCString(),
			ReplyTo: replyMessage?.Id,
			Sender: {
				Username: "MMHLEGO",
				LastSeen: new Date().toUTCString(),
				AvatarUrl: ""
			},
			Attachment: undefined // TODO
		};

		messages.push(message);

		setTimeout(() => scrollToEnd(containerRef), 100);

		//TODO: Send Message (text + reply)
	};

	const closeContextMenu = () => {
		setContextVisible(false);
		setTimeout(() => setSelectedMessage(-1), 200);
	};

	useEffect(() => {
		setNewMessage("");
		setSelectedMessage(-1);
		setContextVisible(false);
		setChatInfoVisible(false);
		// setMessages([]); //TODO

		setTimeout(() => scrollToEnd(containerRef), 100);
	}, [chatId]);

	useEffect(() => {
		console.log(endIsVisible);
	}, [endIsVisible]);

	useEffect(() => {
		if (historyIsVisible) {
			loadHistory();
		}
	}, [historyIsVisible]);

	if (chatId == -1) {
		return (
			<div
				className={twMerge(
					"w-full h-full text-white border-l border-white/50",
					"grid place-content-center text-xl font-medium italic bg-gradient-to-br from-green via-cyan to-blue",
					className
				)}>
				No Chat Selected...
			</div>
		);
	}

	if (chatInfo === undefined) {
		return (
			<div
				className={twMerge(
					"w-full h-full text-white border-l border-white/50",
					"grid place-content-center text-xl font-medium italic bg-gradient-to-br from-green via-cyan to-blue",
					className
				)}>
				<Loading />
			</div>
		);
	}

	return (
		<div
			className={twMerge(
				"w-full h-full flex flex-col text-white border-l border-white/50 bg-white relative",
				"bg-gradient-to-br from-cyan via-30% via-cyan to-blue",
				className
			)}>
			{/* Header */}
			<div
				className={twMerge(
					"flex p-2 gap-2 items-center border-b border-b-white/50",
					"bg-gradient-to-tr from-cyan to-green"
				)}>
				<Button
					accent="cyan"
					onClick={back}
					className="bg-transparent shadow-none -ml-1 -mr-2">
					<Back />
				</Button>

				<div
					className="flex items-center gap-2 pr-5 cursor-pointer"
					onClick={() => setChatInfoVisible(true)}>
					<ChatIcon name={chatInfo.Data.Name} className="border-none" />
					<p>{chatInfo?.Data.Name}</p>
				</div>
			</div>

			{/* Messages List */}
			<div
				className="h-full max-h-full p-3 pb-0 overflow-y-scroll flex flex-col gap-2 relative"
				ref={containerRef}>
				{historyAvailable && (
					<div ref={historyRef} className="grid place-items-center">
						<Loading />
					</div>
				)}

				{/* {messages.slice(0, -1).map((m) => ( */}
				{messages.map((m) => (
					<div key={m.Id} ref={endRef} className="w-full flex flex-col">
						<Message
							key={m.Id}
							chatId={chatInfo.Data.ChatId}
							chatType={chatInfo.Data.Type}
							message={m}
							fromUser={m.Sender.Username === "MMHLEGO"}
							selectMessage={setSelectedMessage}
						/>
					</div>
				))}

				{/* Scroll To End */}
				<Button
					accent="white"
					className={twMerge(
						"fixed bottom-16 text-gray-700 p-1 bg-white border-gray-400/20",
						endIsVisible ? "-right-16" : "right-4"
					)}
					onClick={() => scrollToEnd(containerRef)}>
					<ArrowDown2 />
				</Button>
			</div>

			{/* Send Message */}
			<div className="p-3.5">
				<div
					className={twMerge(
						"flex justify-between gap-2 bg-white ml-4 mr-28 p-1.5 rounded-t-xl text-gray-700 z-10 duration-500",
						replyMessage ? "" : "-mb-9"
					)}>
					<Back />
					<p className="ellipsis w-96 italic text-gray-400 text-center">
						{replyMessage?.Body}
					</p>
					<Button
						secondary
						noBorder
						accent="red"
						className="p-0 rounded-full"
						onClick={() => setReplyMessage(undefined)}>
						<CloseCircle size={20} />
					</Button>
				</div>
				<div className="flex gap-2">
					<textarea
						placeholder="Message..."
						value={newMessage}
						onChange={(e) => {
							if (e.target.value !== "\n") setNewMessage(e.target.value);
						}}
						className={twMerge(
							"duration-300 outline-none rounded-full w-full h-10 text-gray-800 resize-none px-3.5 py-2 text-sm",
							"shadow-md border-2 border-gray-200 z-20"
						)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								if (e.ctrlKey) {
									setNewMessage((m) => {
										if (m.length > 0 && m[0] !== "\n") return m + "\n";
										return m;
									});

									e.currentTarget.selectionStart = e.currentTarget.value.length;
								} else {
									sendMessage();
								}
							}
						}}
					/>
					<Button accent="cyan" className="rounded-full p-2">
						<AttachCircle className="w-5 h-5" />
					</Button>
					<Button accent="green" className="rounded-full p-2" onClick={sendMessage}>
						<Send className="w-5 h-5" />
					</Button>
				</div>
			</div>

			{/* Context Menu */}
			<div
				className={twMerge(
					"absolute duration-300 w-full h-full bg-black/30 z-30",
					contextVisible && contextPos.x
						? " opacity-100"
						: " opacity-0 pointer-events-none"
				)}
				onClick={closeContextMenu}
				onContextMenu={closeContextMenu}>
				<div
					className="bg-white rounded-lg border-white border-b fixed flex flex-col"
					style={{ top: contextPos.y, left: contextPos.x }}>
					<Button
						text="Copy"
						accent="white"
						className="text-black hover:bg-gray-200 gap-8 shadow-none justify-between pr-1.5"
						noBorder
						onClick={() => {
							const message = messages.find((v) => v.Id == selectedMessage);
							if (message) {
								navigator.clipboard.writeText(message.Body);
								toast.success("Coppied to clipboard", {
									position: "bottom-right",
									pauseOnHover: false,
									autoClose: 1000,
									theme: "colored"
								});
							}
						}}>
						<Copy />
					</Button>

					<Button
						text="Reply"
						accent="white"
						className="text-black hover:bg-gray-200 gap-8 shadow-none justify-between pr-1.5"
						noBorder
						onClick={() => {
							setReplyMessage(messages.find((v) => v.Id == selectedMessage));
						}}>
						<BackSquare />
					</Button>

					<Button
						text="Delete"
						accent="red"
						secondary
						noBorder
						className="text-red bg-red/20 hover:bg-red/30 gap-8 shadow-none justify-between pr-1.5"
						onClick={() => deleteSelectedMessage()}>
						<TrushSquare />
					</Button>
				</div>
			</div>

			{/* Chat Info */}
			<ChatInfoPopup
				chatInfo={chatInfo.Data}
				visible={chatInfoVisible}
				closePopup={() => setChatInfoVisible(false)}
			/>
		</div>
	);
}
