export abstract class Cache {
  abstract setWithTTL<T>(key: string, value: T): Promise<boolean>;
  abstract get<T>(key: string): Promise<T>;
}
