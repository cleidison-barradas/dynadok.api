import { NotFoundError } from "../errors";
import { Repository } from "../infra";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: Repository) {}
  async execute(id: string) {
    const result = await this.userRepository.findById(id);

    const user = result.success ? result.data : null;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return this.userRepository.deleteOne(id);
  }
}
