import "express-async-errors";
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
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
import { validateLoginInput, validateRegisterInput } from './middleware/validationMiddleware.js';

app.post('/api/register', validateRegisterInput, register);
app.post('/api/login', validateLoginInput, login);
app.get('/api/logout', logout);
app.post('/api/save', authenticateUser, saveGame);
app.get('/api/load', authenticateUser, loadGame);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on Port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

