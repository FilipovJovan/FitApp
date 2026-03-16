import {Router} from 'express';
import {
    createPlan,
    deletePlan, getDayInPlan, getDaysInPlan,
    getPlan,
    getPlans,
    getWeekInPlan,
    getWeeksInPlan
} from "../controllers/plan.controller.js";

const router = Router();

router.post('/generate', createPlan);
router.get('/', getPlans);
router.get('/:planId', getPlan);
router.delete('/:planId', deletePlan);

router.get('/:planId/weeks', getWeeksInPlan);
router.get('/:planId/weeks/:weekNumber', getWeekInPlan);
router.get('/:planId/weeks/:weekNumber/days', getDaysInPlan);
router.get('/:planId/weeks/:weekNumber/days/:dayNumber', getDayInPlan);

export default router;