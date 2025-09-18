import { Router } from 'express';
import userRouter from './auth';
import therapistRouter from './therapist';
import appointmentRouter from './appointment';
import sessionRouter from './session';

const router = Router();
router.use('/auth', userRouter);
router.use('/therapists', therapistRouter);
router.use('/appointments', appointmentRouter);
router.use('/session', sessionRouter);


export default router;


