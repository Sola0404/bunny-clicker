import Game from "../models/GameModel.js";
import { StatusCodes } from "http-status-codes";

export const saveGame = async (req, res) => {
  const game = await Game.findOne({ ownedBy: req.user.id });
  if (!game) {
    return res.status(404).send("Game not found");
  }
  game.score = req.body.score;
  game.scorePerSecond = req.body.scorePerSecond;
  game.items = req.body.items;

  await game.save();
  res.status(StatusCodes.OK).json({ msg: "Game saved", game: game });
};

export const loadGame = async (req, res) => {
  const game = await Game.findOne({ ownedBy: req.user.id });
  if (!game) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Game not found" });
  }
  res.status(StatusCodes.OK).json({ msg: "Game loaded", game: game });
};