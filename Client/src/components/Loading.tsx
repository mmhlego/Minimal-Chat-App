import { twMerge } from "tailwind-merge";

type Props = {
	size?: "small" | "medium" | "big";
	className?: string;
};

export default function Loading({ size = "medium", className }: Props) {
	const width = size === "big" ? "w-16 h-16" : size === "medium" ? "w-10 h-10" : "w-6 h-6";
	const border = size === "big" ? "border-4" : "border-2";

	return (
		<div
			className={twMerge(
				"rounded-full duration-300 animate-spin border-gray-200 border-y-blue",
				width,
				border,
				className
			)}
		/>
	);
}
