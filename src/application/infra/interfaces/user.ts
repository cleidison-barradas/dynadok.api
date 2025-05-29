export interface IUser {
  _id?: string;
  name: string;
  email: string;
  salt?: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  unsubscribedAt?: Date;
}

export type CreateUserDTO = Pick<
  IUser,
  "name" | "email" | "password" | "phone" | "salt"
>;

export type UpdateUserDTO = Pick<IUser, "name" | "phone">;

export type QueryUserDTO = {
  email?: string;
  name?: string;
};
