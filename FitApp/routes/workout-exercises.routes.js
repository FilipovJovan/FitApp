import {Router} from 'express';
import {deleteWorkoutExercise, updateWorkoutExercise} from "../controllers/workout-exercises.controller.js";

const router = Router();

router.patch('/:id', updateWorkoutExercise);
router.delete('/:id', deleteWorkoutExercise);

export default router;