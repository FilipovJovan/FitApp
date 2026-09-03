import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.put('/me/email', userController.updateEmail);
router.put('/me/password', userController.updatePassword);

export default router;