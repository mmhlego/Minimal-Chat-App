import { useEffect, useState } from "react";
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
import { AxiosError } from "axios";
import { ErrorWrapper } from "../models/ResponseWrapper";

type Props = {
	visible: boolean;
	closePopup: () => void;
};

export default function ProfilePopup({ visible, closePopup }: Props) {
	const [profile, setProfile] = useState<User>({
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		avatarUrl: undefined
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

	const { error, isLoading, refetch } = useQuery(["userProfile"], () => GetProfile(), {
		cacheTime: 0,
		enabled: visible,
		onSuccess(data) {
			if (data.status === "error") handleError();
			else setProfile(data.data);
		},
		onError() {
			handleError();
		}
	});

	const { mutate: updateProfile } = useMutation(
		() =>
			UpdateProfile(
				profile.username,
				profile.email,
				profile.firstName,
				profile.lastName,
				profile.avatarUrl
			),
		{
			onSuccess(res) {
				if (res.status === "success") {
					toast.success("Profile Updated Successfully", {
						position: "bottom-right",
						autoClose: 3000,
						closeOnClick: false,
						pauseOnHover: false
					});
				} else {
					toast.error(res.data, {
						position: "bottom-right",
						autoClose: 3000,
						closeOnClick: false,
						pauseOnHover: false
					});
				}
			},
			onError(err: AxiosError<ErrorWrapper>) {
				toast.error(err.response ? err.response.data.data : "An Error Occurred", {
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: false,
					pauseOnHover: false
				});
			}
		}
	);

	useEffect(() => {
		if (visible) {
			refetch();
		} else {
			setProfile({
				username: "",
				firstName: "",
				lastName: "",
				email: "",
				avatarUrl: undefined
			});
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

	if (error) {
		return <></>;
	}

	return (
		<PopupContainer visible={visible} closePopup={() => {}}>
			<form className="bg-white border border-gray-300 shadow-lg rounded-lg p-4 h-2/3 w-11/12 sm:w-1/2 lg:w-1/3 overflow-x-hidden overflow-y-auto text-black flex flex-col items-center gap-5 dark-scroll relative">
				{profile.avatarUrl ? (
					<img
						className={twMerge("h-16 w-16 rounded-full border border-gray-200")}
						src={profile.avatarUrl}
					/>
				) : (
					<ChatIcon
						name={profile.username}
						className="h-16 w-16 py-4 text-2xl self-center"
					/>
				)}

				<h2 className="font-semibold text-xl">Account Info:</h2>
				<InputField
					label="Username"
					value={profile.username}
					onChange={(e) => {
						setProfile({
							...profile,
							username: e
						});
					}}
					hint="At least 8 characters long"
					className="w-full"
					schema={ProfileFormSchema.shape.username}
				/>

				<InputField
					label="First Name"
					value={profile.firstName}
					onChange={(e) => {
						setProfile({
							...profile,
							firstName: e
						});
					}}
					hint="At least 2 characters long"
					className="w-full"
					schema={ProfileFormSchema.shape.firstName}
				/>

				<InputField
					label="Last Name"
					value={profile.lastName}
					onChange={(e) => {
						setProfile({
							...profile,
							lastName: e
						});
					}}
					hint="At least 2 characters long"
					className="w-full"
					schema={ProfileFormSchema.shape.lastName}
				/>

				<InputField
					label="Avatar Url"
					value={profile.avatarUrl}
					onChange={(e) => {
						setProfile({
							...profile,
							avatarUrl: e
						});
					}}
					hint="At least 8 characters long"
					className="w-full"
					schema={ProfileFormSchema.shape.avatarUrl}
				/>

				<Button
					accent="blue"
					onClick={() => {
						const res = ProfileFormSchema.safeParse(profile);

						console.log(profile);

						if (res.success) {
							updateProfile();
						} else {
							console.log(res.error);

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
			</form>
		</PopupContainer>
	);
}
