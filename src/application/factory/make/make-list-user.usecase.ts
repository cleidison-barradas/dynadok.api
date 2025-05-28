import { UserMongoRepository } from "@/application/infra";
import { ListUsersUseCase } from "../list-users.usecase";

export function makeListUserUseCase() {
  const repository = new UserMongoRepository();
  return new ListUsersUseCase(repository);
}
