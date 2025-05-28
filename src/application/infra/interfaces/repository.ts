import { TResult } from "@/application/helpers/result";
import { CreateUserDTO, IUser, QueryUserDTO, UpdateUserDTO } from "./user";

export abstract class Repository {
  abstract createOne(data: CreateUserDTO): Promise<TResult<IUser>>;
  abstract findById(id: string): Promise<TResult<IUser>>;
  abstract deleteOne(id: string): Promise<TResult<string>>;
  abstract listAll(params?: QueryUserDTO): Promise<TResult<IUser[]>>;
  abstract updateOne(id: string, data: UpdateUserDTO): Promise<TResult<IUser>>;
}
