import { makeCreateUserUseCase } from "@/application/factory/make/make-create-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller, CreateUserDTO } from "@/application/infra";

export class CreateUserController extends Controller {
  async execute(
    httpRequest: HttpRequest<CreateUserDTO>,
  ): Promise<HttpResponse> {
    const usecase = makeCreateUserUseCase();

    const { name, email, password, phone } = httpRequest.body;

    return usecase.execute({
      name,
      email,
      phone,
      password,
    });
  }
}
