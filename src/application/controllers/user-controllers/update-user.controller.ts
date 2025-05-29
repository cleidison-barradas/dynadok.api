import { makeUpdateUserUseCase } from "@/application/factory/make/make-update-user.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller, RedisCache, UpdateUserDTO } from "@/application/infra";

export class UpdateController extends Controller {
  constructor(protected cacheService: RedisCache) {
    super(cacheService);
  }
  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params as { id: string };
    const { name, phone } = httpRequest.body as UpdateUserDTO;

    await this.cacheService.delete(id);

    const usecase = makeUpdateUserUseCase();

    return usecase.execute(id, {
      name,
      phone,
    });
  }
}
