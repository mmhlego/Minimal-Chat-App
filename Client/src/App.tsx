import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import axios from "axios";

const queryClient = new QueryClient();

function App() {
	// const user = useSelector((state: { user: UserData }) => {
	// 	return state.user;
	// });

	// const dispatch = useDispatch();

	useLayoutEffect(() => {
		// if (new Date(user.expiresIn) < new Date()) {
		// 	dispatch(logOut());
		// 	localStorage.removeItem("user");
		// }

		axios.defaults.baseURL = "https://localhost:3000";
		// axios.defaults.headers.common.Authorization = `Bearer ${user.jwtToken}`;
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<div className="w-screen h-screen overflow-hidden">
				<RouterProvider router={router} />
				<ToastContainer />
			</div>
		</QueryClientProvider>
	);
}

export default App;
