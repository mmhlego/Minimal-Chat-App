import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import TestPage from "../pages/TestPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/login",
		element: <LoginPage />
	},
	{
		path: "/register",
		element: <RegisterPage />
	},
	{
		path: "/home",
		element: <HomePage />
	},
	{
		path: "/test",
		element: <TestPage />
	},
	{
		path: "*",
		element: <NotFoundPage />
	}
]);
