import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AddSquare, Back, CloseCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { CreateNewChat } from "../api/ChatApis";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Loading from "../components/Loading";
import { ChatTypes } from "../models/ChatInfo";
import { ErrorWrapper } from "../models/ResponseWrapper";
import { ProfileFormSchema } from "../utils/Schemas";
import PopupContainer from "./PopupContainer";
import { ShowErrorToast, ShowSuccessToast } from "../utils/Toasts";

type Props = {
	visible: boolean;
	closePopup: () => void;
};

export default function CreateChat({ visible, closePopup }: Props) {
	const [name, setName] = useState<string>("");
	const [type, setType] = useState<ChatTypes>("private");
	const [members, setMembers] = useState<string[]>([]);
	const [member, setMember] = useState<string>("");

	const currentUser = "mmhejazi"; //TODO

	const { mutate: createChat, isLoading } = useMutation(
		() => CreateNewChat(name, type, [...members, currentUser]),
		{
			onSuccess(res) {
				if (res.status === "success") {
					ShowSuccessToast("Chat Created Successfully");
				} else {
					ShowErrorToast(res.data);
				}
			},
			onError(err: AxiosError<ErrorWrapper>) {
				ShowErrorToast(err.response?.data.data);
			}
		}
	);

	useEffect(() => {
		if (visible) {
			setName("");
			setMembers([]);
			setType("private");
		}
	}, [visible]);

	if (isLoading)
		return (
			<PopupContainer visible={visible} closePopup={() => {}}>
				<div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4">
					<Loading size="medium" />
				</div>
			</PopupContainer>
		);

	return (
		<PopupContainer visible={visible} closePopup={() => {}}>
			<div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 h-2/3 w-11/12 sm:w-1/2 lg:w-1/3 overflow-x-hidden overflow-y-auto text-black flex flex-col items-center gap-5 dark-scroll relative">
				<h2 className="font-semibold text-xl">Chat Info:</h2>

				<div className="w-full flex items-center justify-between">
					<p>Chat Type:</p>
					<div className="flex">
						<Button
							accent={type === "private" ? "blue" : "white"}
							onClick={() => setType("private")}
							className="py-1">
							Private
						</Button>
						<Button
							accent={type === "group" ? "blue" : "white"}
							onClick={() => setType("group")}
							className="py-1">
							Group
						</Button>
					</div>
				</div>

				{type === "group" ? (
					<>
						<InputField
							label="Chat Name"
							value={name}
							onChange={setName}
							className={"w-full"}
							schema={ProfileFormSchema.shape.lastName}
						/>

						<form className="w-full flex items-center justify-between">
							<p>Members:</p>
							<InputField label="Username" value={member} onChange={setMember} />
							<Button
								accent={"blue"}
								onClick={() => {
									if (member !== "" && !members.includes(member)) {
										setMembers([...members, member]);
									}
									setMember("");
								}}
								className="py-1">
								Add
							</Button>
						</form>

						<div className="w-full flex flex-wrap gap-1.5 bg-gray-100 border border-gray-300 p-2 rounded-lg justify-center items-center">
							{members.length === 0 && (
								<p className="w-full text-sm italic text-center">No Members</p>
							)}
							{members.map((m, i) => (
								<MemberBox
									key={i}
									username={m}
									remove={() =>
										setMembers((prev) => prev.filter((val) => val !== m))
									}
								/>
							))}
						</div>
					</>
				) : (
					<InputField
						label="Username"
						value={member}
						onChange={setMember}
						className="w-full"
						schema={ProfileFormSchema.shape.lastName}
					/>
				)}

				<Button
					accent="blue"
					onClick={() => createChat()}
					className="w-full py-1 gap-1 hover:gap-2.5 hover:bg-blue/10 hover:text-blue mb-0 mt-auto">
					Create {type} Chat
					<AddSquare size={18} />
				</Button>

				<Button
					accent="white"
					secondary
					noBorder
					onClick={closePopup}
					className="absolute top-3 left-3 p-0 text-gray-400 shadow-none">
					<Back size={28} />
				</Button>
			</div>
		</PopupContainer>
	);
}

type MemberProps = {
	username: string;
	remove: () => void;
};
function MemberBox({ username, remove }: MemberProps) {
	return (
		<div
			className="py-1 px-1.5 bg-blue/80 rounded-2xl text-white flex items-center gap-1.5 text-sm cursor-pointer"
			onClick={remove}>
			<p>{username}</p>
			<CloseCircle size={16} />
		</div>
	);
}
