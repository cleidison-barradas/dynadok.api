import { CommonInternalHttpErrorHandler } from "@/application/errors";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { RedisCache } from "../cache/redis-cache";
import { logger } from "@/application/lib";

export abstract class Controller {
  constructor(protected cacheService: RedisCache) {}

  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.execute(httpRequest);
    } catch (error) {
      logger.error(error);
      return CommonInternalHttpErrorHandler.handle(error);
    }
  }
}
