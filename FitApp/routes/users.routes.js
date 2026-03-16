import {Router} from 'express';
import {deleteUser, getUser, updateUser} from "../controllers/user.controller.js";

const router = Router();

router.get('/', getUser);
router.patch('/', updateUser);
router.delete('/', deleteUser);

export default router;