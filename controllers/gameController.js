import Game from "../models/GameModel.js";

export const saveGame = async (req, res) => {
  const game = await Game.findOne({ ownedBy: req.user.id });
  if (!game) {
    return res.status(404).send("Game not found");
  }
  game.score = req.body.score;
  game.scorePerSecond = req.body.scorePerSecond;
  game.items = req.body.items;

  await game.save();
  res.status(200).send("Game saved");
};

export const loadGame = async (req, res) => {
  const game = await Game.findOne({ ownedBy: req.user.id });
  if (!game) {
    return res.status(404).send("Game not found");
  }
  res.status(200).send(game);
};