import { NotFoundError } from "../errors";
import { Repository } from "../infra";

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: Repository) {}

  async execute(id: string) {
    const response = await this.userRepository.findById(id);

    const user = response.success ? response.data : null;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return response;
  }
}
