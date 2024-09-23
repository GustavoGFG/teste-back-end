// routes/userRoutes.ts
import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.put('/update', authMiddleware, userController.updateUser);

export default router;
