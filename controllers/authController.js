import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import User from "../models/UserModel.js";
import Game from "../models/GameModel.js";

export const register = async (req, res) => {
  // check if the username already exists
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }
  const hashedPassword = await hashPassword(req.body.password);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  const game = new Game({
    score: 0,
    scorePerSecond: 0,
    items: [],
    ownedBy: user._id,
  });
  await user.save();
  await game.save();
  res.status(201).send("User registered");
};

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const isValidUser = user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) {
    return res.status(400).send("Invalid username or password");
  }

  const token = createJWT({ username: user.username, id: user._id });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).send("Logged in: " + user.username + " with token: " + token);
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).send("Logged out");
};