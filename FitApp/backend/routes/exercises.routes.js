import { Router } from 'express';
import * as exerciseController from '../controllers/exercise.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExercise);

export default router;