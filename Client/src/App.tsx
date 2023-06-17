import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
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
