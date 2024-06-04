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
	const [score, setScore] = useState(0);
	const [scorePerSecond, setScorePerSecond] = useState(0);
	const [items, setItems] = useState(itemsData);

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

	const loadGame = async () => {
		try {
			// if there is a user logged in
			const response = await customFetch.get("/load");
			const { score, scorePerSecond, items } = response.data;
			console.log(response.data);
			setScore(score);
			setItems(items);
		} catch (error) {
			// Read from local storage if not login
			const saveGame = localStorage.getItem("saveGame");
			if (saveGame) {
				const saveData = JSON.parse(saveGame);
				setScore(saveData.score);
				setItems(saveData.items);
			}
		}
	};

	useEffect(() => {
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

	const saveGameToServer = async () => {
		try {
			const requestBody = { score, scorePerSecond, items };
			console.log(requestBody);
			await customFetch.post("/save", requestBody);
		} catch (error) {
			console.error(error);
			redirect("/login");
		}
	};

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
					<button className="reset-btn" onClick={saveGameToServer}>
						Save Game
					</button>
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
