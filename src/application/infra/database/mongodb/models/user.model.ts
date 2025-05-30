import { Schema } from "mongoose";
import { MongoBaseModel } from "../mongo-base-model";
import { IUser } from "@/application/infra/interfaces";

class UserModel extends MongoBaseModel<IUser> {
  constructor() {
    super();

    this._schemaName = "user";

    this._schemaDefinition = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      salt: { type: String, required: true },
      phone: { type: String, required: true },
      emailVerifiedAt: { type: Date, default: null },
    });

    this._schemaDefinition.set("timestamps", true);
    this._schemaDefinition.index({ email: 1 }, { unique: true });
    this._schemaDefinition.set("versionKey", false);
  }
}

export default new UserModel();
