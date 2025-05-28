import { Repository } from "../infra";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: Repository) {}
  async execute(id: string) {
    return this.userRepository.deleteOne(id);
  }
}
