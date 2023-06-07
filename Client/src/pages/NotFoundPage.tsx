import { Home2 } from "iconsax-react";
import Button from "../components/Button";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-red to-yellow p-2">
			<div className="w-full h-fit sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white rounded-md border border-gray-200 drop-shadow-lg p-8 flex flex-col items-center justify-center gap-3">
				<h2 className="font-semibold text-5xl text-black mb-2 text-center">
					404 Not Found
				</h2>

				<span className="">Your requested page was not found.</span>
				<Button
					accent="orange"
					className="py-2 gap-3 hover:bg-cyan/10 hover:text-cyan mt-2 -mb-4"
					onClick={() => navigate("/home")}>
					<Home2 variant="Bold" />
					Go Home
				</Button>
			</div>
		</div>
	);
}
