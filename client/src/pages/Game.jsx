import { useState, useEffect } from "react";
import itemsData from "../data/itemsData";
import {
	ScoreBoard,
	ClickerContainer,
	ShopContainer,
	UpgradeContainer,
} from "../components";

const Game = () => {
	const [score, setScore] = useState(() => {
		const saveGame = localStorage.getItem("saveGame");
		return saveGame ? JSON.parse(saveGame).score : 0;
	});
	const [scorePerSecond, setScorePerSecond] = useState(() => {
		const saveGame = localStorage.getItem("saveGame");
		return saveGame ? JSON.parse(saveGame).scorePerSecond : 0;
	});
	const [items, setItems] = useState(() => {
		const saveGame = localStorage.getItem("saveGame");
		return saveGame ? JSON.parse(saveGame).items : itemsData;
	});

	const clickingPower = 1;

	useEffect(() => {
		const interval = setInterval(() => {
			setScore((prevScore) => prevScore + scorePerSecond);
		}, 1000);
		return () => clearInterval(interval);
	}, [scorePerSecond]);

	useEffect(() => {
		const newScorePerSecond = items.reduce(
			(acc, item) => acc + item.amount * item.increment,
			0
		);
		setScorePerSecond(newScorePerSecond);
	}, [items]);

	useEffect(() => {
		const loadGame = () => {
			const saveGame = localStorage.getItem("saveGame");
			if (saveGame) {
				const saveData = JSON.parse(saveGame);
				setScore(saveData.score);
				setItems(saveData.items);
			}
		};
		loadGame();
	}, []);

	useEffect(() => {
		const saveGame = () => {
			localStorage.setItem(
				"saveGame",
				JSON.stringify({ score, scorePerSecond, items })
			);
		};
		saveGame();
	}, [score, items]);

	const resetGame = () => {
		if (confirm("Are you sure you want to reset the game?")) {
			localStorage.removeItem("saveGame");
			setScore(0);
			setScorePerSecond(0);
			setItems(itemsData);
		}
	};

	const addToScore = (value) => {
		setScore((prevScore) => prevScore + value);
	};

	const updateItems = (updatedItem) => {
		setItems(
			items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
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
					<button className="reset-btn" onClick={resetGame}>
						Reset Game
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
