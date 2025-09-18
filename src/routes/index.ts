import { Router } from 'express';
import userRouter from './auth';
import therapistRouter from './therapist';
import appointmentRouter from './appointment';

const router = Router();
router.use('/auth', userRouter);
router.use('/therapists', therapistRouter);
router.use('/appointments', appointmentRouter);

export default router;