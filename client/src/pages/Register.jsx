import { Form, Link, redirect, useActionData } from "react-router-dom";
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
	const errors = useActionData();
	return (
		<div>
			<Form method="post">
				<div>Register</div>
				{errors && <p style={{ color: "red" }}>{errors.response.data}</p>}
				<input type="text" name="username" placeholder="Username" />
				<input type="password" name="password" placeholder="Password" />
				<SubmitBtn />
				<p>
					Already having an account? <Link to="/login">Login</Link>
				</p>
			</Form>
		</div>
	);
};
export default Register;
