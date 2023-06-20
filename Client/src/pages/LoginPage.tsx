import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ArrowRight } from "iconsax-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "../api/AuthApis";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Loading from "../components/Loading";
import { ErrorWrapper } from "../models/ResponseWrapper";
import { ShowErrorToast, ShowSuccessToast } from "../utils/Toasts";
import { MainContext } from "../context/MainContext";

type Props = {};

export default function LoginPage({}: Props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const ctx = useContext(MainContext);

	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation(() => Login(username, password), {
		onSuccess(res) {
			if (res.status === "success") {
				localStorage.setItem("jwt", res.data);
				axios.defaults.headers.common.Authorization = `Bearer ${res.data}`;

				ShowSuccessToast("Success. Redirecting...");

				setTimeout(() => navigate("/home"), 3000);
			} else {
				localStorage.removeItem("jwt");
				ShowErrorToast(res.data);
			}
		},
		onError(err: AxiosError<ErrorWrapper>) {
			ShowErrorToast(err.response?.data.data);
		}
	});

	return (
		<div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-green to-cyan p-2">
			<form className="w-full h-fit sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-md border border-gray-200 drop-shadow-lg p-8 flex flex-col items-center justify-center gap-4">
				<h2 className="font-semibold text-3xl text-blue mb-2">Login</h2>
				<InputField
					accent="white"
					value={username}
					label="Username"
					onChange={setUsername}
					className="border-gray-300 w-full"
				/>

				<InputField
					accent="white"
					value={password}
					label="Password"
					onChange={setPassword}
					className="border-gray-300 w-full"
					type="password"
				/>

				<Button
					accent="green"
					noBorder
					disabled={isLoading}
					onClick={() => login()}
					className="w-full py-1.5 gap-1 hover:gap-2.5">
					{isLoading ? (
						<Loading size="small" />
					) : (
						<>
							Login
							<ArrowRight size={18} />
						</>
					)}
				</Button>

				<span className="text-sm -mt-2 -mb-5">
					Don't have an account?{" "}
					<a className="text-blue cursor-pointer" onClick={() => navigate("/register")}>
						Register!
					</a>
				</span>
			</form>
		</div>
	);
}
