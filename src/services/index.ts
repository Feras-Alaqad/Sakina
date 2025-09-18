import { loginByEmail, registerTherapist, registerUser } from './auth';
import { getAdmin } from './admin';
import { getTherapistById, getAllTherapist, updateTherapist } from './therapists';
import { getAppointmentsPerDateService, getAppointmentById, updateIsAvailable, addAppointment } from './appointments';
import createPresignedUrl from './S3Service';
import mailer from './nodemailer';
import generateEmail from './mailBuilder';
import getClientSecret from './payment';

export { loginByEmail, registerTherapist, registerUser, 
    getAdmin, getTherapistById, getAllTherapist, 
    updateTherapist, getAppointmentsPerDateService, getAppointmentById,
    updateIsAvailable, addAppointment, createPresignedUrl, mailer, generateEmail,
    getClientSecret
};
