import bunnyImage from "../assets/bunny.png";

const ClickerContainer = ({ addToScore, clickingPower }) => {
	return (
		<div className="clicker-container">
			<img
				src={bunnyImage}
				alt="bunny image"
				onClick={() => {
					addToScore(clickingPower);
				}}
			/>
		</div>
	);
};
export default ClickerContainer;
