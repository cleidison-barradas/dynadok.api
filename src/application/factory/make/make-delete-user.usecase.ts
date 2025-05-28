import { UserMongoRepository } from "@/application/infra";
import { DeleteUserUseCase } from "../delete-user.usecase";

export function makeDeleteUserUseCase() {
  const repository = new UserMongoRepository();

  return new DeleteUserUseCase(repository);
}
