interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber?: string;
  isActive?: boolean;
}

// eslint-disable-next-line import/prefer-default-export
<<<<<<< HEAD
export { IUser };
=======
export type { IUser };
>>>>>>> master
