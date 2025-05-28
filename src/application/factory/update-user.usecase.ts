import { UpdateUserDTO, Repository } from "../infra";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: Repository) {}

  async execute(id: string, data: UpdateUserDTO) {
    return this.userRepository.updateOne(id, data);
  }
}
