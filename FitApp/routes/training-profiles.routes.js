import {Router} from 'express';
import {
    getTrainingProfile,
    setTrainingProfile,
    updateTrainingProfile
} from "../controllers/training-profiles.controller.js";

const router = Router();

router.post('/', setTrainingProfile);
router.get('/', getTrainingProfile);
router.patch('/', updateTrainingProfile);

export default router;