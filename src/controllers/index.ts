import { login, getAuth, register } from './auth';

import {
  findTherapistById, getAllTherapists, updateTherapistProfile, updateProfileImg,
} from './therapists';

import findClientSecret from './payment';

import { adminLogin, getTherapistsForAdmin, updateTherapistActive } from './admin';


export { login, getAuth, register, adminLogin, findTherapistById,
    getAllTherapists, updateTherapistProfile, findClientSecret,
    updateProfileImg, getTherapistsForAdmin, updateTherapistActive };