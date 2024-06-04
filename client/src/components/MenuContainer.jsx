import {
	loadGameFromServer,
	saveGameToServer,
	resetGame,
} from "../utils/gameUtils";

const MenuContainer = ({
	score,
	scorePerSecond,
	items,
	setScore,
	setScorePerSecond,
	setItems,
}) => {
	return (
		<div className="menu-container">
			<button className="menu-btn">Menu</button>

			<div className="dropdown-menu">
				<button className="menu-item">Register</button>
				<button className="menu-item">Login</button>
				<button
					className="menu-item"
					onClick={() => saveGameToServer(score, scorePerSecond, items)}
				>
					Save
				</button>
				<button
					className="menu-item"
					onClick={() => loadGameFromServer(setScore, setScorePerSecond, setItems)}
				>
					Load
				</button>
				<button
					className="menu-item"
					onClick={() => resetGame(setScore, setScorePerSecond, setItems)}
				>
					Reset
				</button>
				<button className="menu-item">Logout</button>
			</div>
		</div>
	);
};

export default MenuContainer;
