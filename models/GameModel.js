import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  score: Number,
  scorePerSecond: Number,
  items: Array,
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

export default mongoose.model('Game', GameSchema);