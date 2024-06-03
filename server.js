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
mongoose

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on Port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}