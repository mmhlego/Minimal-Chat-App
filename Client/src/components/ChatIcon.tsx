import { twMerge } from "tailwind-merge";

type Props = {
	name: string;
	className?: string;
};

export default function ChatIcon({ name, className }: Props) {
	const words = name.toUpperCase().split(" ");
	const abbreviation =
		words.length >= 2
			? words[0][0] + words[1][0]
			: words[0].length >= 2
			? words[0][0] + words[0][1]
			: words[0][0];

	const gradients = [
		"bg-gradient-to-br from-cyan to-blue text-white",
		"bg-gradient-to-br from-green to-blue text-white",
		"bg-gradient-to-br from-purple to-red text-white",
		"bg-gradient-to-br from-red to-orange text-white",
		"bg-gradient-to-br from-yellow to-red text-white"
	];

	return (
		<div
			className={twMerge(
				"row-span-2 col-span-1 h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center",
				"text-lg font-medium",
				gradients[abbreviation.charCodeAt(0) % gradients.length],
				className
			)}>
			<p>{abbreviation}</p>
		</div>
	);
}
