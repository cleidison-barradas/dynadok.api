import { makeCreateUserUseCase } from "@/application/factory/make/make-create-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller } from "@/application/infra";

export class CreateUserController extends Controller {
  async execute(
    httpRequest: HttpRequest<{
      name: string;
      email: string;
      password: string;
      phone: string;
    }>,
  ): Promise<HttpResponse> {
    const usecase = makeCreateUserUseCase();

    return usecase.execute({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
      phone: httpRequest.body.phone,
    });
  }
}
