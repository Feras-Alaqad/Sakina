interface Payload {
  fullName?: string;
  phoneNumber?: string;
  major?: string;
  bio?: string;
  cvLink?: string;
  hourlyRate?: number;
}
interface IPayload {
  role: string;
  userId?: number;
  therapistId?: number;
  adminId?: number;
}

<<<<<<< HEAD
export { Payload, IPayload };
=======
export type { Payload, IPayload };
>>>>>>> master
