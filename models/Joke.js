
import mongoose from "mongoose";

const JoleSchem = new mongoose.Schema({
    text: { type: String, required: true}
});

export default mongoose.model('Joke' , JoleSchem);