import { useState } from "react";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import InputField from "../components/InputField";

type Props = {};

export default function LoginPage({}: Props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	// 	const [res, login] = usePostApi<string>(
	// 		"/login",
	// 		() => {
	// 			toast.success("Success. Redirecting...", {
	// 				position: "bottom-right",
	// 				autoClose: 3000,
	// 				closeOnClick: false,
	// 				pauseOnHover: false
	// 			});
	//
	// 			setTimeout(() => navigate("/home"), 4000);
	// 		},
	// 		() => {
	// 			toast.error("An Error Occurred", {
	// 				position: "bottom-right",
	// 				autoClose: 3000,
	// 				closeOnClick: false,
	// 				pauseOnHover: false
	// 			});
	// 		}
	// 	);

	return (
		<div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-green to-cyan p-2">
			<div className="w-full h-fit sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-md border border-gray-200 drop-shadow-lg p-8 flex flex-col items-center justify-center gap-4">
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
				/>

				<Button
					accent="green"
					noBorder
					// disabled={res.loading}
					onClick={() => {
						// login({ username, password });
					}}
					className="w-full py-1.5 gap-1 hover:gap-2.5">
					{/* {res.loading ? (
						<Loading size="small" />
					) : (
						<>
							Login
							<ArrowRight size={18} />
						</>
					)} */}
				</Button>

				<span className="text-sm -mt-2 -mb-5">
					Don't have an account?{" "}
					<a className="text-blue cursor-pointer" onClick={() => navigate("/register")}>
						Register!
					</a>
				</span>
			</div>
		</div>
	);
}
