import { Router } from 'express';
import * as planController from '../controllers/plan.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.post('/', planController.createPlan);
router.get('/', planController.getMyPlans);
router.get('/:id', planController.getPlan);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);

export default router;