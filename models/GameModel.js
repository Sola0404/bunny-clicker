import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  score: Number,
  scorePerSecond: Number,
  items: Array,
});

export default mongoose.model('Game', GameSchema);