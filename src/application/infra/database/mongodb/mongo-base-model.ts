import { Model, Schema } from "mongoose";

export class MongoBaseModel<T> {
  public _model: Model<T>;
  public _schemaName: string;
  public _schemaDefinition: Schema<T>;

  _setModel(mode: Model<T>): void {
    this._model = mode;
  }

  _getModel(): Model<T> {
    return this._model;
  }
}
