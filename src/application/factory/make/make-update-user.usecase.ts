import { UserMongoRepository } from "@/application/infra";
import { UpdateUserUseCase } from "../update-user.usecase";

export function makeUpdateUserUseCase() {
  const repository = new UserMongoRepository();

  return new UpdateUserUseCase(repository);
}
