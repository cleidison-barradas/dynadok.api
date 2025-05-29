import { makeDeleteUserUseCase } from "@/application/factory/make/make-delete-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller, RedisCache } from "@/application/infra";

export class DeleteUserController extends Controller {
  constructor(protected cacheService: RedisCache) {
    super(cacheService);
  }
  async execute(
    httpRequest: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse> {
    await this.cacheService.delete(httpRequest?.params?.id);

    const usecase = makeDeleteUserUseCase();

    const { id } = httpRequest.params;

    return usecase.execute(id);
  }
}
