import { useState } from "react";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { RegisterFormSchema } from "../utils/Schemas";
import { useMutation } from "@tanstack/react-query";
import { Register } from "../api/AuthApis";
import Loading from "../components/Loading";
import { ArrowRight } from "iconsax-react";
import axios, { AxiosError } from "axios";
import { ErrorWrapper } from "../models/ResponseWrapper";
import { ShowErrorToast, ShowSuccessToast } from "../utils/Toasts";

type Props = {};

export default function RegisterPage({}: Props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordR, setPasswordR] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [avatar, setAvatar] = useState("");

	const navigate = useNavigate();

	const { mutate: register, isLoading } = useMutation(
		() => Register(username, password, email, firstName, lastName, avatar),
		{
			onSuccess(res) {
				if (res.status === "success") {
					localStorage.setItem("jwt", res.data);
					axios.defaults.headers.common.Authorization = `Bearer ${res.data}`;

					ShowSuccessToast("Success. Redirecting...");

					setTimeout(() => navigate("/home"), 4000);
				} else {
					ShowErrorToast(res.data);
				}
			},
			onError(err: AxiosError<ErrorWrapper>) {
				ShowErrorToast(err.response?.data.data);
			}
		}
	);

	return (
		<div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue to-purple p-2">
			<form className="w-full h-fit sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-md border border-gray-200 drop-shadow-lg p-8 flex flex-col items-center justify-center gap-4">
				<h2 className="font-semibold text-3xl text-blue mb-2">Register</h2>
				<InputField
					label="Username"
					value={username}
					onChange={setUsername}
					hint="At least 8 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.username}
				/>

				<InputField
					label="Password"
					value={password}
					onChange={setPassword}
					hint="At least 8 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.password}
					type="password"
				/>

				<InputField
					label="Repeat Password"
					value={passwordR}
					onChange={setPasswordR}
					hint="Must be same as password"
					className="w-full"
					schema={RegisterFormSchema.shape.password.refine((v) => v == password)}
					type="password"
				/>

				<InputField
					label="Email Address"
					value={email}
					onChange={setEmail}
					hint="A valid email address"
					className="w-full"
					schema={RegisterFormSchema.shape.email}
				/>

				<InputField
					label="First Name"
					value={firstName}
					onChange={setFirstName}
					hint="At least 2 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.firstName}
				/>

				<InputField
					label="Last Name"
					value={lastName}
					onChange={setLastName}
					hint="At least 2 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.lastName}
				/>

				<InputField
					label="Avatar Url"
					value={avatar}
					onChange={setAvatar}
					hint="At least 8 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.avatar}
				/>

				<Button
					accent="green"
					noBorder
					disabled={isLoading}
					onClick={() => {
						const data = { username, password, email, firstName, lastName, avatar };
						const res = RegisterFormSchema.safeParse(data);

						if (res.success && password === passwordR) {
							register();
						} else if (password !== passwordR) {
							ShowErrorToast("Repeat password is incorrect");
						} else if (!res.success) {
							console.log(res.error.errors[0].message);

							ShowErrorToast(res.error.errors[0].message);
						}
					}}
					className="w-full py-1.5 gap-1 hover:gap-2.5">
					{isLoading ? (
						<Loading size="small" />
					) : (
						<>
							Register
							<ArrowRight size={18} />
						</>
					)}
				</Button>

				<span className="text-sm -mt-2 -mb-5">
					Already have an account?{" "}
					<a className="text-blue cursor-pointer" onClick={() => navigate("/login")}>
						Login!
					</a>
				</span>
			</form>
		</div>
	);
}
