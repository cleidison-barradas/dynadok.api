import { UserMongoRepository } from "@/application/infra";
import { SetMailSendAtUseCase } from "../set-user-send-mail-at.usecase";

export function makeSetUserSendMailUseCase() {
  const repository = new UserMongoRepository();

  return new SetMailSendAtUseCase(repository);
}
