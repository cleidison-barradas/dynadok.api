import {
  CommonInternalErrorHandler,
  NotFoundError,
} from "@/application/errors";

import { TResult } from "@/application/helpers/result";
import { resultOk } from "@/application/helpers/http";
import UserModel from "../models/user.model";
import {
  IUser,
  QueryUserDTO,
  Repository,
  UpdateUserDTO,
} from "@/application/infra/interfaces";

export class UserMongoRepository extends Repository {
  async createOne(data: IUser): Promise<TResult<IUser>> {
    try {
      const model = UserModel._getModel();
      const result = await model.create(data);

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
  async findById(id: string): Promise<TResult<IUser>> {
    try {
      const model = UserModel._getModel();
      const result = await model.findById(id);

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
  async listAll(params: QueryUserDTO): Promise<TResult<IUser[]>> {
    try {
      const model = UserModel._getModel();
      const result = await model.find(params);

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }

  async updateOne(id: string, data: UpdateUserDTO): Promise<TResult<IUser>> {
    try {
      const model = UserModel._getModel();
      let result = await model.findById(id);

      if (!result) {
        throw new NotFoundError("User not found");
      }
      await result.updateOne(data);

      result = await model.findById(id);

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }

  async deleteOne(id: string): Promise<TResult<string>> {
    try {
      const model = UserModel._getModel();
      const result = await model.findById(id);

      if (!result) {
        throw new NotFoundError("User not found");
      }

      await result.deleteOne();

      return resultOk(id);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
}
