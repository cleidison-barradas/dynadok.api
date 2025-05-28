import { CommonInternalHttpErrorHandler } from "@/application/errors";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";

export abstract class Controller {
  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.execute(httpRequest);
    } catch (error) {
      return CommonInternalHttpErrorHandler.handle(error);
    }
  }
}
