import { CommonInternalHttpErrorHandler } from "@/application/errors";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { logger } from "@/application/lib";

export abstract class Controller {
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
