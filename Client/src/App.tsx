import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

function App() {
	return (
		<div className="w-screen h-screen overflow-hidden">
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
}

export default App;
