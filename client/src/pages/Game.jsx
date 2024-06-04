import { useState, useEffect } from "react";
import itemsData from "../utils/itemsData";
import {
	ScoreBoard,
	ClickerContainer,
	ShopContainer,
	UpgradeContainer,
} from "../components";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

const Game = () => {
	const loadGameFromLocalStorage = () => {
		const saveGame = localStorage.getItem("saveGame");
		if (saveGame) {
			return JSON.parse(saveGame);
		}
		return { score: 0, scorePerSecond: 0, items: itemsData };
	};

	const initialGameState = loadGameFromLocalStorage();

	const [score, setScore] = useState(initialGameState.score);
	const [scorePerSecond, setScorePerSecond] = useState(
		initialGameState.scorePerSecond
	);
	const [items, setItems] = useState(initialGameState.items);

	const clickingPower = 1;

	const loadGameFromServer = async () => {
		try {
			const response = await customFetch.get("/load");
			const { score, scorePerSecond, items } = response.data;
			setScore(score);
			setScorePerSecond(scorePerSecond);
			setItems(items);
		} catch (error) {
			redirect("/login");
		}
	};

	const saveGameToLocalStorage = () => {
		localStorage.setItem(
			"saveGame",
			JSON.stringify({ score, scorePerSecond, items })
		);
	};

	const saveGameToServer = async () => {
		try {
			const requestBody = { score, scorePerSecond, items };
			await customFetch.post("/save", requestBody);
		} catch (error) {
			console.error(error);
			redirect("/login");
		}
	};

	const resetGame = () => {
		if (window.confirm("Are you sure you want to reset the game?")) {
			localStorage.removeItem("saveGame");
			setScore(0);
			setScorePerSecond(0);
			setItems(itemsData);
		}
	};

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
		saveGameToLocalStorage();
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
					<button className="reset-btn" onClick={saveGameToServer}>
						Save
					</button>
					<button className="reset-btn" onClick={loadGameFromServer}>
						Load
					</button>
					<button className="reset-btn" onClick={resetGame}>
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
