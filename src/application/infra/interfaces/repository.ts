export abstract class Repository {
  abstract createOne(data: unknown): Promise<unknown>;
  abstract findById(id: string): Promise<unknown>;
  abstract deleteOne(id: string): Promise<unknown>;
  abstract listAll(params: unknown): Promise<unknown>;
  abstract updateOne(id: string, data: unknown): Promise<unknown>;
}
