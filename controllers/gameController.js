import "express-async-errors";
import Game from "../models/GameModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const saveGame = async (req, res) => {
  const game = await Game.findOne({ ownedBy: req.user.id });
  if (!game) {
    throw new NotFoundError("Game not found");
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
    throw new NotFoundError("Game not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Game loaded", game: game });
};