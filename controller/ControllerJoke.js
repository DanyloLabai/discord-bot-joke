import Jokes from "../models/Joke.js";
import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const randomJoke = async (req, res) => {
  try {
    // const useAi = Math.random() < 0.5;

    // if (useAi) {
    //   const prompt = "Придумай веселий короткий жарт українською мовою.";

    //   const response = await openai.chat.completions.create({
    //     model: "gpt-4o-mini",
    //     messages: [{ role: "user", content: prompt }],
    //     max_tokens: 60,
    //     temperature: 0.8,
    //   });

    //   const aiJoke = response.choices[0].message.content;

    //   if (!aiJoke) return res.status(404).send("AI joke not found");
    //   return res.status(201).json({ text: aiJoke.trim() });
    // } else {
      const counter = await Jokes.countDocuments();
      const random = Math.floor(Math.random() * counter);
      const joke = await Jokes.findOne().skip(random);

      if (!joke) return res.status(404).send("Not found");

      return res.status(201).json({ text: joke.text });
    // }
  } catch (err) {
    res.status(500).json({ message: "Error", err });
  }
};

export const allJokes = async (req, res) => {
  try {
    const jokes = await Jokes.find();

    if (!jokes) return res.status(404).send("Not found");

    res.json(jokes);
  } catch (err) {
    res.status(500).json({ message: "Error", err });
  }
};

export const addJoke = async (req, res) => {
  try {
    const newJoke = new Jokes({ text: req.body.text });
    await newJoke.save();
    res.status(201).json(newJoke);
  } catch (err) {
    res.status(500).json({ message: "Error creating joke", err });
  }
};

export const deleteJoke = async (req, res) => {
  try {
    await Jokes.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error deleting ", err });
  }
};
