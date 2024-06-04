import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Game, Register, Login, Error } from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Game />,
		errorElement: <Error />,
		children: [
			{ path: "register", element: <Register /> },
			{ path: "login", element: <Login /> },
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
