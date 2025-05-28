import { makeUpdateUserUseCase } from "@/application/factory/make/make-update-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller } from "@/application/infra";

export class UpdateController extends Controller {
  async execute(
    httpRequest: HttpRequest<{ id: string; name: string }>,
  ): Promise<HttpResponse> {
    const usecase = makeUpdateUserUseCase();

    return usecase.execute(httpRequest.params.id, httpRequest.body);
  }
}
