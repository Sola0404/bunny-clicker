import { useState, useEffect } from "react";
import {
	ScoreBoard,
	ClickerContainer,
	ShopContainer,
	UpgradeContainer,
	MenuContainer,
} from "../components";
import {
	loadGameFromLocalStorage,
	saveGameToLocalStorage,
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
			<MenuContainer
				score={score}
				scorePerSecond={scorePerSecond}
				items={items}
				setScore={setScore}
				setScorePerSecond={setScorePerSecond}
				setItems={setItems}
			/>
			<div className="section-left">
				<h1>Bunny Clicker</h1>
				<ScoreBoard score={score} scorePerSecond={scorePerSecond} />
				<br />
				<ClickerContainer addToScore={addToScore} clickingPower={clickingPower} />
				<div className="section-footer">{/* TODO: Add a footer */}</div>
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
