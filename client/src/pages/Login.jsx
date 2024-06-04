import { Form, Link, redirect, useActionData } from "react-router-dom";
import { SubmitBtn } from "../components";
import customFetch from "../utils/customFetch.js";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/login", data);
		return redirect("/");
	} catch (error) {
		console.error(error.response.data);
		return error;
	}
};

const Login = () => {
	const errors = useActionData();
	return (
		<div>
			<Form method="post">
				<div>Login</div>
				{errors && <p style={{ color: "red" }}>{errors.response.data}</p>}
				<input type="text" name="username" placeholder="Username" />
				<input type="password" name="password" placeholder="Password" />
				<SubmitBtn />
				<p>
					Not having an account? <Link to="/register">Register</Link>
				</p>
			</Form>
		</div>
	);
};
export default Login;
