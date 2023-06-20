import { toast } from "react-toastify";

export const ShowErrorToast = (
	text: string | undefined,
	duration = 3000,
	theme?: "light" | "dark" | "colored"
) => {
	toast.error(text ? text : "An error ocurred", {
		position: "bottom-right",
		autoClose: duration,
		closeOnClick: false,
		pauseOnHover: false,
		theme
	});
};

export const ShowSuccessToast = (
	text: string,
	duration = 3000,
	theme?: "light" | "dark" | "colored"
) => {
	toast.success(text, {
		position: "bottom-right",
		autoClose: duration,
		closeOnClick: false,
		pauseOnHover: false,
		theme
	});
};
