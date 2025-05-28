import { makeListUserUseCase } from "@/application/factory/make/make-list-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller } from "@/application/infra";

export class ListUsersController extends Controller {
  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    const usecase = makeListUserUseCase();

    return usecase.execute(httpRequest.params);
  }
}
