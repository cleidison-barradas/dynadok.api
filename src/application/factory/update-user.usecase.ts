import { NotFoundError } from "../errors";
import { UpdateUserDTO, Repository } from "../infra";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: Repository) {}

  async execute(id: string, data: UpdateUserDTO) {
    const result = await this.userRepository.findById(id);

    if (!result.success || !result.data) {
      throw new NotFoundError("User not found");
    }

    return this.userRepository.updateOne(id, data);
  }
}
