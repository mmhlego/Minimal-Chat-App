import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	visible: boolean;
	closePopup: () => void;
	children?: ReactNode;
	className?: string;
};

export default function PopupContainer({ visible, closePopup, children, className }: Props) {
	return (
		<div
			className={twMerge(
				"absolute duration-300 w-full h-full bg-black/30 z-40 grid place-items-center",
				visible ? " opacity-100" : " opacity-0 pointer-events-none",
				className
			)}
			onClick={closePopup}
			onContextMenu={closePopup}>
			{children}
		</div>
	);
}
