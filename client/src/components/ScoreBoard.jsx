const ScoreBoard = ({ score, scorePerSecond }) => {
	return (
		<div className="score-container">
			<span>{score}</span> bunny
			<br />
			<span>{scorePerSecond}</span> bunny per second
		</div>
	);
};
export default ScoreBoard;
