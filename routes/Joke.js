import express from 'express';
const router = express.Router();
import {randomJoke , addJoke , allJokes , deleteJoke} from '../controller/ControllerJoke.js';


router.get('/random',randomJoke );
router.get('/',allJokes );
router.post('/', addJoke);
router.delete('/:id',deleteJoke);


export default router;