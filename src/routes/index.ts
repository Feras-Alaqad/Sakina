import { Router } from 'express';
import userRouter from './auth';
import therapistRouter from './therapist';

const router = Router();
router.use('/auth', userRouter);
router.use('/therapists', therapistRouter);

export default router;