import { Repository } from "../infra";

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: Repository) {}

  async execute(id: string) {
    return this.userRepository.findById(id);
  }
}
