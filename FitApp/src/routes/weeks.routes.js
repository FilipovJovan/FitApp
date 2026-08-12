import { Router } from 'express';
import * as weekController from '../controllers/week.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.post('/plans/:planId/weeks', weekController.createWeek);
router.get('/plans/:planId/weeks', weekController.getWeeksForPlan);
router.delete('/weeks/:id', weekController.deleteWeek);

export default router;