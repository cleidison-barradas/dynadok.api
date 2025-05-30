import { NotFoundError } from "../errors";
import { Repository } from "../infra";

export class SetMailSendAtUseCase {
  constructor(private readonly repository: Repository) {}

  async execute(id: string, emailVerifiedAt: Date) {
    const result = await this.repository.findById(id);

    const user = result.success ? result.data : null;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.repository.setSendMailAt(id, emailVerifiedAt);
  }
}
