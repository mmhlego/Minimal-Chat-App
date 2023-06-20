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

		axios.defaults.baseURL = "http://localhost:3000";
		// axios.defaults.headers.common.Authorization = `Bearer ${user.jwtToken}`;
		axios.defaults.headers.common.Authorization =
			// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5pciIsInVzZXJJZCI6IjY0OTE3NDI1NmNiODAyNjEzZTEzMGZjYSIsImlhdCI6MTY4NzI1OTI3NiwiZXhwIjoxNzE4Nzk1Mjc2fQ.es2wgHcGMWlgRvSn_CJleIOb9mlaSAMjCJ5FLCAEFEw";
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1taGxlZ29AZ21haWwuY29tIiwidXNlcklkIjoiNjQ5MTcwMDA2Y2I4MDI2MTNlMTMwZjdhIiwiaWF0IjoxNjg3MjUyOTkyLCJleHAiOjE3MTg3ODg5OTJ9.3O-doYoO7nlBoTBTI8D79hhd6DVB_FKCSboNGRuuM1A";
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
