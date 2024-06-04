import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Game, Register, Login, Error } from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as gameLoader } from "./pages/Game";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Game />,
		errorElement: <Error />,
		loader: gameLoader,
	},
	{
		path: "/register",
		element: <Register />,
		action: registerAction,
	},
	{
		path: "/login",
		element: <Login />,
		action: loginAction,
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
