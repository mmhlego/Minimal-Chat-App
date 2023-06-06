import { useState } from "react";
import Button from "./Button";
import { Profile, SearchNormal, CloseCircle } from "iconsax-react";
import { twMerge } from "tailwind-merge";
import InputField from "./InputField";

type Props = {
	setSearchText: (text: string) => void;
};

export default function Header({ setSearchText }: Props) {
	const [opened, setOpened] = useState(false);

	return (
		<div className="w-full h-fit bg-gradient-to-br from-green to-cyan">
			<div className="flex p-2 gap-2 items-center justify-between border-b-2 border-b-white/50">
				<Button className="p-2 bg-transparent border-none shadow-none">
					<Profile variant="Bold" />
				</Button>
				<p className="text-white font-medium">Conversations List</p>
				<Button
					className="p-2 bg-transparent border-none shadow-none"
					onClick={() => setOpened((o) => !o)}>
					<SearchNormal />
				</Button>
			</div>
			<div
				className={twMerge(
					"w-full overflow-hidden duration-300 flex gap-1 items-center justify-between",
					opened ? "h-12 p-2" : "h-0"
				)}>
				<InputField
					placeholder="Search..."
					accent="blue"
					className="bg-white/80 w-11/12"
					onChange={setSearchText}
				/>
				<Button
					noBorder
					className="p-2 bg-transparent border-none shadow-none"
					onClick={() => setSearchText("")}>
					<CloseCircle />
				</Button>
			</div>
		</div>
	);
}
