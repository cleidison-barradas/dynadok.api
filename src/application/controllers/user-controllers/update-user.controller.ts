import { makeUpdateUserUseCase } from "@/application/factory/make/make-update-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller, UpdateUserDTO } from "@/application/infra";

export class UpdateController extends Controller {
  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params as { id: string };
    const { name, phone } = httpRequest.body as UpdateUserDTO;

    const usecase = makeUpdateUserUseCase();

    return usecase.execute(id, {
      name,
      phone,
    });
  }
}
