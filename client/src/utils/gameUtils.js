import customFetch from "../utils/customFetch";
import itemsData from "./itemsData.js";
import { toast } from "react-toastify";

export const loadGameFromLocalStorage = () => {
  const saveGame = localStorage.getItem("saveGame");
  if (saveGame) {
    return JSON.parse(saveGame);
  }
  return { score: 0, scorePerSecond: 0, items: itemsData };
};

export const loadGameFromServer = async (setScore, setScorePerSecond, setItems) => {
  try {
    const response = await customFetch.get("/load");
    const { score, scorePerSecond, items } = response.data.game;
    setScore(score);
    setScorePerSecond(scorePerSecond);
    setItems(items);
    toast.success("Game loaded successfully!");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const saveGameToLocalStorage = (score, scorePerSecond, items) => {
  localStorage.setItem(
    "saveGame",
    JSON.stringify({ score, scorePerSecond, items })
  );
};

export const saveGameToServer = async (score, scorePerSecond, items) => {
  try {
    const requestBody = { score, scorePerSecond, items };
    await customFetch.post("/save", requestBody);
    toast.success("Game saved successfully!");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

export const resetGame = (setScore, setScorePerSecond, setItems) => {
  if (window.confirm("Are you sure you want to reset the game?")) {
    localStorage.removeItem("saveGame");
    setScore(0);
    setScorePerSecond(0);
    setItems(itemsData);
    toast.success("Game reset successfully!");
  }
};

export const logout = async () => {
  await customFetch.get("/logout");
  toast.success("Logged out successfully!");
};