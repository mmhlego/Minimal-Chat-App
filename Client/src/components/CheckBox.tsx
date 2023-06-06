import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	label: string;
	checked?: boolean;
	disabled?: boolean;
	className?: string;
	onChange?: (value: boolean) => void;
};

export default function CheckBox({
	label,
	checked = false,
	disabled = false,
	className,
	onChange
}: Props) {
	const [state, setState] = useState(checked);

	return (
		<div className={twMerge("flex gap-1.5 items-center", className)}>
			<input
				checked={state}
				className={twMerge(
					"w-5 h-5 relative outline-none appearance-none after:h-full after:w-full after:bg-transparent after:border-2 after:border-gray-300 after:absolute after:rounded-md after:duration-200 cursor-pointer",
					"checked:after:bg-cyan checked:after:border-transparent shadow-lg shadow-black/20",
					"before:w-1.5 before:h-3 before:absolute before:z-10 before:mx-[7px] before:my-0.5 before:rotate-45 before:border-b-[3px] before:border-r-[3px] before:border-white"
				)}
				type="checkbox"
				disabled={disabled}
				onChange={(e) => {
					!disabled && setState(e.target.checked);
					!disabled && onChange && onChange(e.target.checked);
				}}
			/>
			{label}
		</div>
	);
}
