import {Router} from 'express';
import {getDayExercises, setDayExercises} from "../controllers/day.controller.js";

const router = Router();

router.post('/:dayId/exercises', setDayExercises);
router.get('/:dayId/exercises', getDayExercises);

export default router;