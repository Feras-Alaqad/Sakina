import express from 'express';
import { 
  getAppointments, 
  updateAvailable, 
  addAppointment 
} from '../controllers/appointments';
import { checkAuth, checkTherapist } from '../middlewares';

const router = express.Router();

// Get appointments by date for a therapist
router.get('/therapist/:therapistId', getAppointments);

// Update appointment availability (therapist only)
router.patch('/:id', checkAuth, checkTherapist, updateAvailable);

// Add new appointments (therapist only)
router.post('/', checkAuth, checkTherapist, addAppointment);

export default router;