export interface IUser {
  _id?: string;
  name: string;
  email: string;
  salt: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  unsubscribedAt?: Date;
}

export type CreateUserDTO = Pick<
  IUser,
  "name" | "email" | "password" | "phone"
>;

export type UpdateUserDTO = Pick<IUser, "name" | "phone"> & { id: string };

export type QueryUserDTO = {
  email?: string;
  name?: string;
};
