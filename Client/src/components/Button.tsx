import { ReactNode } from "react";
import { PrimaryColors } from "../models/Types";
import { twMerge } from "tailwind-merge";

type Props = {
	text?: string;
	accent?: PrimaryColors;
	className?: string;
	disabled?: boolean;
	noBorder?: boolean;
	secondary?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: ReactNode;
};

export default function Button({
	text,
	accent = "blue",
	className = "",
	disabled = false,
	secondary = false,
	noBorder = false,
	onClick,
	children
}: Props) {
	const color = disabled ? "gray-300" : accent;
	const primaryStyle = `text-white bg-${color}/90 font-normal`;
	const secondaryStyle = `text-${color} bg-${color}/10 font-medium`;

	// ${color} => ${color}

	return (
		<button
			onClick={disabled ? undefined : onClick}
			className={twMerge(
				`shadow-lg shadow-black/15 flex gap-1 items-center justify-center py-1.5 px-3 rounded-md border-${color} duration-300 outline-0`,
				noBorder ? "m-[2px]" : "border-2",
				secondary ? secondaryStyle : primaryStyle,
				disabled ? "cursor-not-allowed grayscale" : "",
				className
			)}>
			{text}
			{children}
		</button>
	);
}
