import { Router } from 'express';
import { registerUser, loginUser } from '../api/controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
