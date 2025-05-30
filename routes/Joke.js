import express from 'express';
const router = express.Router();
import {randomJoke , addJoke} from '../controller/ControllerJoke.js';


router.get('/random',randomJoke );
router.post('/', addJoke);

export default router;