import { MakeFindUserByIdUseCase } from "@/application/factory/make/make-find-user-by-id.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller } from "@/application/infra";

export class FindUserByIdController extends Controller {
  async execute(
    httpRequest: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse> {
    const usecase = MakeFindUserByIdUseCase();

    return usecase.execute(httpRequest?.params?.id);
  }
}
