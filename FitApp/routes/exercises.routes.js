import {Router} from 'express';
import {createExercise, getExercise, getExercises} from "../controllers/exercise.controller.js";

const router = Router();

router.get('/', getExercises);
router.get('/:id', getExercise);
router.post('/', createExercise);

export default router;