import { useState } from "react";
import { PrimaryColors } from "../models/Types";
import { twMerge } from "tailwind-merge";

type Props = {
	label?: string;
	placeholder?: string;
	accent?: "" | PrimaryColors;
	hint?: string;
	disabled?: boolean;
	rtl?: boolean;
	className?: string;
	onChange?: (value: string) => void;
};

export default function InputField({
	label = "",
	placeholder = "",
	accent = "",
	hint = "",
	disabled = false,
	rtl = false,
	className,
	onChange
}: Props) {
	const color = disabled ? "gray-300" : accent === "" ? "gray-400" : accent;

	const [value, setValue] = useState("");

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
					value ? "-mt-4 font-normal text-xs" : "mx-1.5 font-semibold text-sm",
					`after:absolute after:left-0 after:bg-${color}/10 after:w-full after:bottom-0 after:duration-300`,
					value ? `after:h-1/2` : `after:h-full`,
					disabled ? "text-gray-400" : ""
				)}>
				{label}
			</p>
			<input
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
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

// <div
// 	className={twMerge(
// 		`absolute duration-300 bg-white`,
// 		value ? "-mt-4 font-normal text-xs" : "ml-1 font-medium text-sm"
// 	)}>
// 	<p className={twMerge(`bg-${color}/10`, value ? "h-full" : "h-1/2")}>{label}</p>
// </div>;

// interface Props2 {
// 	name?: string;
// 	placeholder?: string;
// 	disabled?: boolean;
// 	isPassword?: boolean;
// 	icon?: JSX.Element;
// 	className?: string;
// 	rtl?: boolean;
// 	setText?: (newText: string) => void;
// 	validator?: (newVal: string) => boolean;
// }

// export function OldInputField({
// 	name,
// 	placeholder,
// 	disabled = false,
// 	isPassword = false,
// 	icon,
// 	className,
// 	rtl = false,
// 	setText,
// 	validator
// }: Props2) {
// 	type fieldStatus = "ok" | "fail" | "idle";
//
// 	const [status, setStatus] = useState<fieldStatus>("idle");

// 	const borderColor = (s: fieldStatus) => {
// 		if (disabled) return "border-gray-300";
// 		if (s === "ok") return "border-green";
// 		if (s === "fail") return "border-red";
// 		return "border-gray-300";
// 	};
//
// 	const fieldIcon = (s: fieldStatus) => {
// 		if (disabled) return icon;
// 		if (s === "ok") return <TickCircle variant="Bold" size={20} color="#06c574" />;
// 		if (s === "fail") return <CloseCircle variant="Bold" size={20} color="#ef3b50" />;
// 		return icon;
// 	};

// 	return (
// 		<div className={`flex flex-col items-end relative ${className}`}>
// 			<p className="w-full font-semibold text-right">{name}</p>
// 			<input
// 				type={isPassword ? "password" : "text"}
// 				className={`w-full duration-300 border-2 p-3 mt-1 rounded-lg text-right outline-none bg-white ${
// 					status === "idle" && !disabled ? `hover:border-blue focus:border-blue` : ""
// 				} ${borderColor(status)} ${disabled ? "placeholder:text-gray-300" : ""}`}
// 				placeholder={placeholder}
// 				disabled={disabled}
// 				onChange={(e) => {
// 					if (setText) setText(e.target.value);
// 					setStatus(validator ? (validator(e.target.value) ? "ok" : "fail") : "idle");
// 				}}
// 				dir={rtl ? "rtl" : "ltr"}
// 			/>
//
// 			<div
// 				className={`absolute bottom-4 left-3.5 ${
// 					disabled ? "text-gray-300" : "text-gray-500"
// 				}`}>
// 				{fieldIcon(status)}
// 			</div>
// 		</div>
// 	);
// }
