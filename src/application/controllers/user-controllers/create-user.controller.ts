import { makeCreateUserUseCase } from "@/application/factory/make/make-create-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import {
  Controller,
  CreateUserDTO,
  sendQueueMessage,
} from "@/application/infra";

export class CreateUserController extends Controller {
  async execute(
    httpRequest: HttpRequest<CreateUserDTO>,
  ): Promise<HttpResponse> {
    const usecase = makeCreateUserUseCase();

    const { name, email, password, phone } = httpRequest.body;

    const response = await usecase.execute({
      name,
      email,
      phone,
      password,
    });

    const user = response.success ? response.data : null;

    delete user.salt;
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    await sendQueueMessage({
      topic: "sendEmailAccountActivation",
      message: JSON.stringify(user),
    });

    return response;
  }
}
