import { authenticateUser } from './middleware/authMiddleware.js';
import { saveGame, loadGame } from './controllers/gameController.js';
import { register, login, logout } from './controllers/authController.js';
import express from 'express';
const app = express();
app.use(express.json());

import morgan from "morgan";

import cookieParser from 'cookie-parser';
app.use(cookieParser());

import * as dotenv from "dotenv";
dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL);

app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/logout', logout);
app.post('/api/save', authenticateUser, saveGame);
app.get('/api/load', authenticateUser, loadGame);

const port = process.env.PORT || 5100;

try {
  app.listen(port, () => {
    console.log(`server running on Port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

