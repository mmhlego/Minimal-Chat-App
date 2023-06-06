import { twMerge } from "tailwind-merge";
import Button from "./Button";

type Props = {
	chatId: number;
	back: () => void;
	className?: string;
};

export default function ChatSection({ chatId, back, className }: Props) {
	return (
		<div className={twMerge("w-full h-full bg-blue/20", className)}>
			<Button text="Back" onClick={back} />
			Selected Chat Id: {chatId ? chatId : "None"}
		</div>
	);
}
