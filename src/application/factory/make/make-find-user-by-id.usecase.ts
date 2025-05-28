import { UserMongoRepository } from "@/application/infra";
import { FindUserByIdUseCase } from "../find-user-by-id.usecase";

export function MakeFindUserByIdUseCase() {
  const repository = new UserMongoRepository();

  return new FindUserByIdUseCase(repository);
}
