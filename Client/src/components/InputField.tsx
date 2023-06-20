import { useEffect, useState } from "react";
import { PrimaryColors } from "../models/Types";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

type Props = {
	label?: string;
	value?: string;
	placeholder?: string;
	accent?: "" | PrimaryColors;
	hint?: string;
	disabled?: boolean;
	type?: React.HTMLInputTypeAttribute;
	rtl?: boolean;
	className?: string;
	onChange?: (value: string) => void;
	schema?: z.ZodType;
};

export default function InputField({
	label = "",
	value: currentValue,
	placeholder = "",
	accent = "",
	hint = "",
	disabled = false,
	type = "text",
	rtl = false,
	className,
	onChange,
	schema
}: Props) {
	const [color, setColor] = useState(disabled ? "gray-300" : accent === "" ? "gray-400" : accent);

	// const [currentValue, setCurrentValue] = useState(initialValue);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		if (schema && focused) {
			setColor(schema.safeParse(currentValue).success ? "green" : "red");
		}
	}, [currentValue]);

	return (
		<div
			className={twMerge(
				"shadow-lg shadow-black/15 h-10 w-36 border-2 border-blue rounded-lg bg-gray-100 p-1.5 relative",
				`bg-${color}/10 border-${color}`,
				hint ? "mb-4" : "",
				disabled ? "cursor-not-allowed" : "",
				className
			)}
			dir={rtl ? "rtl" : "ltr"}>
			<p
				className={twMerge(
					`absolute duration-300 bg-white pointer-events-none mt-0.5`,
					currentValue ? "-mt-4 font-normal text-xs" : "mx-1.5 font-semibold text-sm",
					`after:absolute after:left-0 after:bg-${color}/10 after:w-full after:bottom-0 after:duration-300`,
					currentValue ? `after:h-1/2` : `after:h-full`,
					disabled ? "text-gray-400" : ""
				)}>
				{label}
			</p>
			<input
				type={type}
				value={currentValue}
				onChange={(e) => {
					setFocused(true);
					// setCurrentValue(e.target.value);
					onChange && onChange(e.target.value);
				}}
				className={twMerge(
					"w-full h-full outline-none bg-transparent",
					disabled ? "cursor-not-allowed" : ""
				)}
				disabled={disabled}
				placeholder={placeholder}
			/>
			<p className="text-xs mt-2 font-light italic">{hint}</p>
		</div>
	);
}
