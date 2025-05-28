import { UserMongoRepository } from "@/application/infra";
import { CreateUserUseCase } from "../create-user.usecase";

export function makeCreateUserUseCase() {
  const repository = new UserMongoRepository();

  return new CreateUserUseCase(repository);
}
