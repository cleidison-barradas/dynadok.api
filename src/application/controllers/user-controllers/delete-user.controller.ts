import { makeDeleteUserUseCase } from "@/application/factory/make/make-delete-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller } from "@/application/infra";

export class DeleteUserController extends Controller {
  async execute(
    httpRequest: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse> {
    const usecase = makeDeleteUserUseCase();

    const { id } = httpRequest.params;

    return usecase.execute(id);
  }
}
