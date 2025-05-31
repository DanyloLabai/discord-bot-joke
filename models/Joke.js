import mongoose from "mongoose";

const JokeSchem = new mongoose.Schema({
  text: { type: String, required: true },
});

export default mongoose.model("Joke", JokeSchem);
