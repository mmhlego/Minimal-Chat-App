import { useState } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import ChatIcon from "../components/ChatIcon";
import InputField from "../components/InputField";
import User from "../models/User";
import { ProfileFormSchema } from "../utils/Schemas";
import PopupContainer from "./PopupContainer";
import { Back, RefreshSquare } from "iconsax-react";
import Loading from "../components/Loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetProfile, UpdateProfile } from "../api/AuthApis";

type Props = {
	visible: boolean;
	closePopup: () => void;
};

export default function ProfilePopup({ visible, closePopup }: Props) {
	const [profile, setProfile] = useState<User>({
		Username: "",
		FirstName: "",
		LastName: "",
		Email: "",
		AvatarUrl: ""
	});

	const handleError = () => {
		closePopup();
		toast.error("An error occurred while loading your profile info", {
			position: "bottom-right",
			autoClose: 3000,
			closeOnClick: false,
			pauseOnHover: false
		});
	};

	const { error, isLoading } = useQuery(["userProfile"], () => GetProfile(), {
		cacheTime: 0,
		onSuccess(data) {
			if (data.Status === "Error") handleError();
			else setProfile(data.Data);
		},
		onError() {
			handleError();
		}
	});

	const { mutate: updateProfile } = useMutation(
		() =>
			UpdateProfile(
				profile.Username,
				profile.Email,
				profile.FirstName,
				profile.LastName,
				profile.AvatarUrl
			),
		{
			onSuccess() {
				toast.success("Success. Redirecting...", {
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: false,
					pauseOnHover: false
				});
			},
			onError() {
				toast.error("An Error Occurred", {
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: false,
					pauseOnHover: false
				});
			}
		}
	);

	if (isLoading)
		return (
			<PopupContainer visible={visible} closePopup={() => {}}>
				<div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4">
					<Loading size="medium" />
				</div>
			</PopupContainer>
		);

	if (error) {
		return <></>;
	}

	return (
		<PopupContainer visible={visible} closePopup={() => {}}>
			<div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 h-2/3 w-11/12 sm:w-1/2 lg:w-1/3 overflow-x-hidden overflow-y-auto text-black flex flex-col items-center gap-5 dark-scroll relative">
				{profile.AvatarUrl ? (
					<img
						className={twMerge("h-16 w-16 rounded-full border border-gray-200")}
						src={profile.AvatarUrl}
					/>
				) : (
					<ChatIcon
						name={profile.Username}
						className="h-16 w-16 py-4 text-2xl self-center"
					/>
				)}

				<h2 className="font-semibold text-xl">Account Info:</h2>
				<InputField
					label="Username"
					initialValue={profile.Username}
					onChange={(e) => {
						setProfile({
							...profile,
							Username: e
						});
					}}
					hint="At least 8 characters long"
					className="w-full"
					schema={ProfileFormSchema.shape.username}
				/>

				<InputField
					label="First Name"
					initialValue={profile.FirstName}
					onChange={(e) => {
						setProfile({
							...profile,
							FirstName: e
						});
					}}
					hint="At least 2 characters long"
					className="w-full"
					schema={ProfileFormSchema.shape.firstName}
				/>

				<InputField
					label="Last Name"
					initialValue={profile.LastName}
					onChange={(e) => {
						setProfile({
							...profile,
							LastName: e
						});
					}}
					hint="At least 2 characters long"
					className="w-full"
					schema={ProfileFormSchema.shape.lastName}
				/>

				<InputField
					label="Avatar Url"
					initialValue={profile.AvatarUrl}
					onChange={(e) => {
						setProfile({
							...profile,
							AvatarUrl: e
						});
					}}
					hint="At least 8 characters long"
					className="w-full"
					schema={ProfileFormSchema.shape.avatar}
				/>

				<Button
					accent="blue"
					onClick={() => {
						const res = ProfileFormSchema.safeParse(profile);

						if (res.success) {
							updateProfile();
						} else {
							console.log(res.error.errors[0].message);

							toast.error(res.error.errors[0].message, {
								position: "bottom-right",
								autoClose: 3000,
								closeOnClick: false,
								pauseOnHover: false
							});
						}
					}}
					className="w-full py-1 gap-1 hover:gap-2.5 hover:bg-blue/10 hover:text-blue">
					Update Information
					<RefreshSquare size={18} />
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
