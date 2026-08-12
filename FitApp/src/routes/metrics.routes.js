import { Router } from 'express';
import * as metricsController from '../controllers/metrics.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.post('/', metricsController.createMetric);
router.get('/', metricsController.getHistory);
router.get('/latest', metricsController.getLatest);

export default router;