import { Router } from 'express';
import { registerUser, loginUser } from '../api/controllers/userController';
import authMiddleware from '../api/middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.use(authMiddleware);

export default router;
