import "express-async-errors";
import express from 'express';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import * as dotenv from "dotenv";
import mongoose from 'mongoose';
import path from "path";
import { fileURLToPath } from "url";

// Import middlewares and controllers
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import { saveGame, loadGame } from './controllers/gameController.js';
import { register, login, logout } from './controllers/authController.js';
import { validateLoginInput, validateRegisterInput } from './middleware/validationMiddleware.js';

// Initialize app
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Define API routes
app.post('/api/register', validateRegisterInput, register);
app.post('/api/login', validateLoginInput, login);
app.get('/api/logout', logout);
app.post('/api/save', authenticateUser, saveGame);
app.get('/api/load', authenticateUser, loadGame);

// Error handling middleware
app.use(errorHandlerMiddleware);

// Static file serving
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

// Catch-all route to serve the React app for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// Connect to MongoDB and start server
const port = process.env.PORT || 5100;

try {
  mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
