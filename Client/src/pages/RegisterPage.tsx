import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { RegisterFormSchema } from "../utils/Schemas";

type Props = {};

export default function RegisterPage({}: Props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [avatar, setAvatar] = useState("https://i.pravatar.cc/50");

	const navigate = useNavigate();

	// 	const [res, register] = usePostApi<string>(
	// 		"/register",
	// 		() => {
	// 			toast.success("Success. Logging in...", {
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
		<div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue to-purple p-2">
			<div className="w-full h-fit sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-md border border-gray-200 drop-shadow-lg p-8 flex flex-col items-center justify-center gap-4">
				<h2 className="font-semibold text-3xl text-blue mb-2">Register</h2>
				<InputField
					label="Username"
					onChange={setUsername}
					hint="At least 8 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.username}
				/>

				<InputField
					label="Password"
					onChange={setPassword}
					hint="At least 8 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.password}
				/>

				<InputField
					label="Repeat Password"
					hint="Must be same as password"
					className="w-full"
					schema={RegisterFormSchema.shape.password.refine((v) => v == password)}
				/>

				<InputField
					label="First Name"
					onChange={setFirstName}
					hint="At least 2 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.firstName}
				/>

				<InputField
					label="Last Name"
					onChange={setLastName}
					hint="At least 2 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.lastName}
				/>

				<InputField
					label="Avatar Url"
					initialValue={avatar}
					onChange={setAvatar}
					hint="At least 8 characters long"
					className="w-full"
					schema={RegisterFormSchema.shape.avatar}
				/>

				<Button
					accent="green"
					noBorder
					// disabled={res.loading}
					onClick={() => {
						const data = { username, password, firstName, lastName, avatar };
						const res = RegisterFormSchema.safeParse(data);

						if (res.success) {
							// register(data);
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
					className="w-full py-1.5 gap-1 hover:gap-2.5">
					{/* {res.loading ? (
						<Loading size="small" />
					) : (
						<>
							Register
							<ArrowRight size={18} />
						</>
					)} */}
				</Button>

				<span className="text-sm -mt-2 -mb-5">
					Already have an account?{" "}
					<a className="text-blue cursor-pointer" onClick={() => navigate("/login")}>
						Login!
					</a>
				</span>
			</div>
		</div>
	);
}
