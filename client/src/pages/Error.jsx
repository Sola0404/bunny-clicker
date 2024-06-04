import { Link, useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	if (error.status === 404) {
		return (
			<div>
				<div>Page not found</div>
				<Link to="/">Home</Link>
			</div>
		);
	}
	return <div>Something went wrong.</div>;
};

export default Error;
