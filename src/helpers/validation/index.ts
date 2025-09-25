<<<<<<< HEAD
import { getAppointmentSchema, updateAvailableSchema, addAppointmentSchema } from './appointments';
=======
import { getAppointmentSchema, updateAvailableSchema, addAppointmentSchema } from './appointment';
>>>>>>> master
import therapistInfoSchema from './therapist';
import userLoginSchema from './userLogin';
import userRegisterSchema from './userRegister';
import { adminLoginSchema, updateTherapistActiveSchema } from './admin';

export {
  getAppointmentSchema, updateAvailableSchema, therapistInfoSchema, addAppointmentSchema,
  userLoginSchema, userRegisterSchema, adminLoginSchema, updateTherapistActiveSchema,
};
