import { randomUUID } from "node:crypto";
import { resultOk } from "@/application/helpers/http";
import { TResult } from "@/application/helpers/result";
import {
  IUser,
  Repository,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/application/infra/interfaces";
import { CommonInternalErrorHandler } from "@/application/errors";

export class InMemoryUserRepository extends Repository {
  private users: IUser[] = [];
  async createOne(data: CreateUserDTO): Promise<TResult<IUser>> {
    try {
      return new Promise((resolve) => {
        this.users.push({
          ...data,
          _id: randomUUID(),
          salt: Math.random().toString(36).substring(7),
        });

        resolve(resultOk(this.users[this.users.length - 1]));
      });
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
  async findById(id: string): Promise<TResult<IUser>> {
    try {
      const index = this.users.findIndex((user) => user._id === id);

      return new Promise((resolve) => {
        resolve(resultOk(this.users[index]));
      });
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
  async deleteOne(id: string): Promise<TResult<string>> {
    try {
      const index = this.users.findIndex((user) => user._id === id);

      return new Promise((resolve) => {
        this.users.splice(index, 1);
        resolve(resultOk(id));
      });
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
  async listAll(params: unknown): Promise<TResult<IUser[]>> {
    return new Promise((resolve) => {
      resolve(resultOk(this.users));
    });
  }
  async updateOne(id: string, data: UpdateUserDTO): Promise<TResult<IUser>> {
    try {
      const index = this.users.findIndex((user) => user._id === id);

      const user = this.users[index];

      return new Promise((resolve) => {
        this.users[index] = {
          ...user,
          ...data,
        };
        resolve(resultOk(this.users[index]));
      });
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }

  async findByEmail(email: string): Promise<TResult<IUser>> {
    return new Promise((resolve) => {
      const user = this.users.find((user) => user.email === email);
      resolve(resultOk(user));
    });
  }

  async setSendMailAt(
    id: string,
    emailVerifiedAt: Date,
  ): Promise<TResult<IUser>> {
    try {
      const index = this.users.findIndex((user) => user._id === id);

      return new Promise((resolve) => {
        const user = this.users[index];
        this.users[index] = {
          ...user,
          emailVerifiedAt,
        };

        resolve(resultOk(this.users[index]));
      });
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
}
