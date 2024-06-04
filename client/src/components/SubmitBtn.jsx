import { useNavigation } from "react-router-dom";

const SubmitBtn = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<button className="submit-btn" type="submit" disabled={isSubmitting}>
			{isSubmitting ? "submitting..." : "submit"}
		</button>
	);
};

export default SubmitBtn;
