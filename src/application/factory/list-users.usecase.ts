import { QueryUserDTO, Repository } from "../infra";

export class ListUsersUseCase {
  constructor(private readonly userRepository: Repository) {}

  async execute(params: QueryUserDTO) {
    return this.userRepository.listAll(params);
  }
}
