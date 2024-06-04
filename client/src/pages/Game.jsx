import { useState, useEffect } from "react";
import {
	ScoreBoard,
	ClickerContainer,
	ShopContainer,
	UpgradeContainer,
} from "../components";
import {
	loadGameFromLocalStorage,
	loadGameFromServer,
	saveGameToLocalStorage,
	saveGameToServer,
	resetGame,
} from "../utils/gameUtils";

const Game = () => {
	const initialGameState = loadGameFromLocalStorage();

	const [score, setScore] = useState(initialGameState.score);
	const [scorePerSecond, setScorePerSecond] = useState(
		initialGameState.scorePerSecond
	);
	const [items, setItems] = useState(initialGameState.items);

	const clickingPower = 1;

	// Update scorePerSecond every time items change
	useEffect(() => {
		const newScorePerSecond = items.reduce(
			(acc, item) => acc + item.amount * item.increment,
			0
		);
		setScorePerSecond(newScorePerSecond);
	}, [items]);

	// Update score every second
	useEffect(() => {
		const interval = setInterval(() => {
			setScore((prevScore) => prevScore + scorePerSecond);
		}, 1000);
		return () => clearInterval(interval);
	}, [scorePerSecond]);

	// Load game data from local storage in default
	useEffect(() => {
		loadGameFromLocalStorage();
	}, []);

	// Save game data to local storage when score or items change
	useEffect(() => {
		saveGameToLocalStorage(score, scorePerSecond, items);
	}, [score, items]);

	const addToScore = (value) => {
		setScore((prevScore) => prevScore + value);
	};

	const updateItems = (updatedItem) => {
		setItems((prevItems) =>
			prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
		);
	};

	return (
		<div>
			<div className="section-left">
				<h1>Bunny Clicker</h1>
				<ScoreBoard score={score} scorePerSecond={scorePerSecond} />
				<br />
				<ClickerContainer addToScore={addToScore} clickingPower={clickingPower} />
				<div className="section-footer">
					<button
						className="reset-btn"
						onClick={() => saveGameToServer(score, scorePerSecond, items)}
					>
						Save
					</button>
					<button
						className="reset-btn"
						onClick={() => loadGameFromServer(setScore, setScorePerSecond, setItems)}
					>
						Load
					</button>
					<button
						className="reset-btn"
						onClick={() => resetGame(setScore, setScorePerSecond, setItems)}
					>
						Reset
					</button>
				</div>
			</div>

			<div className="section-right">
				<UpgradeContainer
					items={items}
					score={score}
					setScore={setScore}
					updateItems={updateItems}
				/>
				<ShopContainer
					items={items}
					score={score}
					setScore={setScore}
					updateItems={updateItems}
				/>
			</div>
		</div>
	);
};

export default Game;
