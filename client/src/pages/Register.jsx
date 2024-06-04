import { Form, Link, redirect } from "react-router-dom";
import axios from "axios";
import { SubmitBtn } from "../components";
import customFetch from "../utils/customFetch.js";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	try {
		await customFetch.post("/register", data);
		return redirect("/login");
	} catch (error) {
		return error;
	}
};

const Register = () => {
	return (
		<div>
			<Form method="post">
				<div>Register</div>
				<input type="text" name="username" placeholder="Username" />
				<input type="password" name="password" placeholder="Password" />
				<SubmitBtn />
			</Form>
			<p>
				Already having an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
};
export default Register;
