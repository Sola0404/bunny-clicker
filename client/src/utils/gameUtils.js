import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import itemsData from "./itemsData.js";

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
    const { score, scorePerSecond, items } = response.data;
    setScore(score);
    setScorePerSecond(scorePerSecond);
    setItems(items);
  } catch (error) {
    redirect("/login");
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
  } catch (error) {
    console.error(error);
    redirect("/login");
  }
};

export const resetGame = (setScore, setScorePerSecond, setItems) => {
  if (window.confirm("Are you sure you want to reset the game?")) {
    localStorage.removeItem("saveGame");
    setScore(0);
    setScorePerSecond(0);
    setItems(itemsData);
  }
};