import { Form, Link, redirect } from "react-router-dom";
import { SubmitBtn } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/login", data);
		toast.success("Logged in successfully!");
		return redirect("/");
	} catch (error) {
		toast.error(error.response.data);
		return error;
	}
};

const Login = () => {
	return (
		<div className="form-container">
			<Form method="post">
				<div className="form-title">Login</div>
				<input
					type="text"
					name="username"
					placeholder="Username"
					className="form-input"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="form-input"
				/>
				<SubmitBtn />
				<p className="link">
					Not having an account? <Link to="/register">Register</Link>
				</p>
			</Form>
		</div>
	);
};
export default Login;
