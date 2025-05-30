import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import JokeRout from './routes/Joke.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/jokes' , JokeRout);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Mongo connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Mongo error', err));