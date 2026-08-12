import { Router } from 'express';
import * as trainingProfileController from '../controllers/training-profiles.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', trainingProfileController.getProfile);
router.put('/', trainingProfileController.upsertProfile);

export default router;