import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from 'express';
const app = express();
app.use(express.json());

import morgan from "morgan";

import * as dotenv from "dotenv";
dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  score: Number,
  scorePerSecond: Number,
  items: Array,
});

const User = mongoose.model("User", userSchema);

app.post('/register', async (req, res) => {
  // check if the username already exists
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    score: 0,
    scorePerSecond: 0,
    items: [],
  });
  await user.save();
  res.status(201).send("User registered");
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, username: user.username });
  } else {
    res.status(400).send("Invalid username or password");
  }
});

const port = process.env.PORT || 5100;

try {
  app.listen(port, () => {
    console.log(`server running on Port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

