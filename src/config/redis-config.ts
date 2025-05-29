type RedisDBProps = {
  host: string;
  port: number;
  password: string;
};

export const redisConfig: RedisDBProps = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD || "",
};
