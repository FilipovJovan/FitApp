import { Router } from 'express';
import * as workoutExerciseController from '../controllers/workout-exercises.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.post('/days/:dayId/exercises', workoutExerciseController.addExerciseToDay);
router.get('/days/:dayId/exercises', workoutExerciseController.getExercisesForDay);
router.put('/workout-exercises/:id', workoutExerciseController.updateWorkoutExercise);
router.delete('/workout-exercises/:id', workoutExerciseController.deleteWorkoutExercise);

export default router;