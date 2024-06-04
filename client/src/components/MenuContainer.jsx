import {
	loadGameFromServer,
	saveGameToServer,
	resetGame,
	logout,
} from "../utils/gameUtils";
import { Link } from "react-router-dom";

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
				<Link to="/register" style={{ textDecoration: "none" }}>
					<button className="menu-item">Register</button>
				</Link>
				<Link to="/login" style={{ textDecoration: "none" }}>
					<button className="menu-item">Login</button>
				</Link>
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
				<button className="menu-item" onClick={() => logout()}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default MenuContainer;
