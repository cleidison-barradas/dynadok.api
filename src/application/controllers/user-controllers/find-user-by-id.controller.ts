import { MakeFindUserByIdUseCase } from "@/application/factory/make/make-find-user-by-id.usecase";
import { HttpRequest, HttpResponse } from "@/application/helpers/http";
import { Controller, IUser, RedisCache } from "@/application/infra";

export class FindUserByIdController extends Controller {
  constructor(protected cacheService: RedisCache) {
    super(cacheService);
  }
  async execute(
    httpRequest: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse> {
    let user = await this.cacheService.get<IUser>(httpRequest?.params?.id);

    if (user) {
      return {
        code: 200,
        data: user,
        success: true,
      };
    }

    const usecase = MakeFindUserByIdUseCase();

    const response = await usecase.execute(httpRequest?.params?.id);

    await this.cacheService.setWithTTL(
      httpRequest?.params?.id,
      response.success ? response.data : null,
    );

    return response;
  }
}
