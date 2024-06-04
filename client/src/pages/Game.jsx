import { useState, useEffect } from "react";
import itemsData from "../utils/itemsData";
import {
	ScoreBoard,
	ClickerContainer,
	ShopContainer,
	UpgradeContainer,
} from "../components";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
	try {
		// if there is a user logged in
		const response = await customFetch.get("/load");
		const { score, scorePerSecond, items } = response.data;
		console.log(response.data);
		return { score, scorePerSecond, items };
	} catch (error) {
		// Not login
		// if there is game data in local storage
		const saveGame = localStorage.getItem("saveGame");
		if (saveGame) {
			return JSON.parse(saveGame);
		}
		// if there is no game data in local storage
		return { score: 0, scorePerSecond: 0, items: itemsData };
	}
};

const Game = () => {
	const {
		score: initialScore,
		scorePerSecond: initialScorePerSecond,
		items: initialItems,
	} = useLoaderData();

	const [score, setScore] = useState(initialScore);
	const [scorePerSecond, setScorePerSecond] = useState(initialScorePerSecond);
	const [items, setItems] = useState(initialItems);

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
			await customFetch.post("/save", { score, scorePerSecond, items });
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
