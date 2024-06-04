import { Form, Link, redirect, useActionData } from "react-router-dom";
import { SubmitBtn } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/register", data);
		toast.success("Registered successfully!");
		return redirect("/login");
	} catch (error) {
		toast.error(error.response.data);
		return error;
	}
};

const Register = () => {
	return (
		<div className="form-container">
			<Form method="post">
				<div className="form-title">Register</div>
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
					Already having an account? <Link to="/login">Login</Link>
				</p>
			</Form>
		</div>
	);
};
export default Register;
