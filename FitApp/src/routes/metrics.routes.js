import {Router} from 'express';
import {deleteMetric, getLatestMetric, getMetrics, setMetrics} from "../controllers/metrics.controller.js";

const router = Router();

router.post('/', setMetrics);
router.get('/', getMetrics);
router.get('/latest', getLatestMetric);
router.delete('/:id', deleteMetric);

export default router;