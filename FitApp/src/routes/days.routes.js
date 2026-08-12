import { Router } from 'express';
import * as dayController from '../controllers/day.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.post('/weeks/:weekId/days', dayController.createDay);
router.get('/weeks/:weekId/days', dayController.getDaysForWeek);
router.get('/days/:id', dayController.getDay);
router.delete('/days/:id', dayController.deleteDay);

export default router;