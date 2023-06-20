import { RouterProvider, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLayoutEffect, useContext, useEffect } from "react";
import axios from "axios";
import { ContextProvider, MainContext } from "./context/MainContext";

const queryClient = new QueryClient();

function App() {
	useLayoutEffect(() => {
		axios.defaults.baseURL = "http://localhost:3000";
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ContextProvider>
				<div className="w-screen h-screen overflow-hidden">
					<RouterProvider router={router} />
					<ToastContainer />
				</div>
			</ContextProvider>
		</QueryClientProvider>
	);
}

export default App;
