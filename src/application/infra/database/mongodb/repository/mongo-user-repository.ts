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

import { Model } from "mongoose";

export class UserMongoRepository extends Repository {
  private model: Model<IUser>;

  constructor() {
    super();

    this.model = UserModel._getModel();
  }
  async createOne(data: IUser): Promise<TResult<IUser>> {
    try {
      const result = await this.model.create(data);

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
  async findById(id: string): Promise<TResult<IUser>> {
    try {
      const result = await this.model.findById(id);

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
  async listAll(params: QueryUserDTO): Promise<TResult<IUser[]>> {
    try {
      const result = await this.model.find(params);

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }

  async updateOne(id: string, data: UpdateUserDTO): Promise<TResult<IUser>> {
    try {
      let result = await this.model.findById(id);

      if (!result) {
        throw new NotFoundError("User not found");
      }
      await result.updateOne(data);

      result = await this.model.findById(id);

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }

  async deleteOne(id: string): Promise<TResult<string>> {
    try {
      const result = await this.model.findById(id);

      if (!result) {
        throw new NotFoundError("User not found");
      }

      await result.deleteOne();

      return resultOk(id);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }

  async findByEmail(email: string): Promise<TResult<IUser>> {
    try {
      const result = await this.model.findOne({ email });

      return resultOk(result);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }

  async setSendMailAt(
    id: string,
    emailVerifiedAt?: Date,
  ): Promise<TResult<IUser>> {
    try {
      let user = await this.model.findById(id);

      await user.updateOne({ emailVerifiedAt });

      user = await this.model.findById(id);

      return resultOk(user);
    } catch (error) {
      return CommonInternalErrorHandler.handle(error);
    }
  }
}
