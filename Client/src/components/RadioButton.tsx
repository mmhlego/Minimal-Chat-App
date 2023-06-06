import { twMerge } from "tailwind-merge";

type Props = {
	label: string;
	group: string;
	disabled?: boolean;
	checked?: boolean;
	className?: string;
	onChange?: (value: boolean) => void;
};

export default function RadioButton({
	label,
	group,
	disabled = false,
	className,
	onChange
}: Props) {
	return (
		<div className={twMerge("flex gap-1.5 items-center", className)}>
			<input
				className={twMerge(
					"shadow-lg shadow-black/15 w-5 h-5 relative outline-none appearance-none after:h-full after:w-full after:bg-transparent after:border-2 after:border-gray-300 after:absolute after:rounded-full after:duration-200 cursor-pointer",
					"checked:after:bg-cyan checked:after:border-transparent",
					"before:w-3 before:h-3 before:rounded-full before:bg-white before:absolute before:z-10 before:m-1"
				)}
				type="radio"
				name={group}
				onChange={(e) => {
					!disabled && onChange && onChange(e.target.checked);
				}}
			/>
			{label}
		</div>
	);
}
