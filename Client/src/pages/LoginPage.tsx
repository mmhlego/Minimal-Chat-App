import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "../api/AuthApis";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Loading from "../components/Loading";
import { ErrorWrapper } from "../models/ResponseWrapper";

type Props = {};

export default function LoginPage({}: Props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation(() => Login(username, password), {
		onSuccess(res) {
			if (res.status === "success") {
				toast.success("Success. Redirecting...", {
					position: "bottom-right",
					autoClose: 3000,
					closeOnClick: false,
					pauseOnHover: false
				});

				setTimeout(() => navigate("/home"), 3000);
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
	});

	return (
		<div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-green to-cyan p-2">
			<form className="w-full h-fit sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-md border border-gray-200 drop-shadow-lg p-8 flex flex-col items-center justify-center gap-4">
				<h2 className="font-semibold text-3xl text-blue mb-2">Login</h2>
				<InputField
					accent="white"
					label="Username"
					onChange={setUsername}
					className="border-gray-300 w-full"
				/>

				<InputField
					accent="white"
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
