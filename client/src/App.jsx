import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Game, Register, Login, Error } from "./pages";
import { action as registerAction } from "./pages/Register";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Game />,
		errorElement: <Error />,
	},
	{
		path: "/register",
		element: <Register />,
		action: registerAction,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
