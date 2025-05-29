import Redis, { RedisOptions } from "ioredis";
import { logger } from "@/application/lib";

const EXPIRATION_TIME = 60 * 60;

export class RedisCache {
  private redisClient: Redis;
  constructor(private readonly redisOptions: RedisOptions) {
    this.redisClient = new Redis(this.redisOptions);

    this.redisClient.on("error", async (error) => {
      logger.error(`Redis client error: ${error}`);
      await this.redisClient.quit();
    });

    this.redisClient.on("connect", () => {
      logger.info("Redis client connected");
    });

    this.redisClient.on("close", () => {
      logger.info("Redis client disconnected");
    });

    process.on("SIGINT", async () => {
      await this.redisClient.quit();
    });

    process.on("SIGTERM", async () => {
      await this.redisClient.quit();
    });
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);

    return data ? (JSON.parse(data) as T) : null;
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async setWithTTL<T>(key: string, value: T): Promise<boolean> {
    await this.redisClient.set(
      key,
      JSON.stringify(value),
      "EX",
      EXPIRATION_TIME,
    );

    return true;
  }
}
