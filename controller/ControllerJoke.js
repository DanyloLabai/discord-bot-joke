

import Jokes from '../models/Joke.js';


export const randomJoke = async(req , res ) => {
    try{
        const counter = await Jokes.countDocuments();
        const random = Math.floor(Math.random() * counter);
        const joke = await Jokes.findOne().skip(random);

        if(!joke) return res.status(404).send('Not found');

        res.json(joke);
    }catch(err){
        res.status(500).json({ message: "Error", err });
    }
}

export const addJoke = async (req , res) => {
    try{
        const newJoke = new Jokes({text: req.body.text});
        await newJoke.save();
        res.status(201).json(newJoke);
    }catch(err){
        res.status(500).json({ message: "Error creating joke", err});
    }
}