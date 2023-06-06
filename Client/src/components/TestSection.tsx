import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	dir?: "flex-col" | "flex-row";
};

export default function TestSection({ children, dir = "flex-row" }: Props) {
	return (
		<div
			className={`flex ${dir} justify-center items-center p-6 gap-4 border-2 border-purple rounded-xl border-dashed`}>
			{children}
		</div>
	);
}
