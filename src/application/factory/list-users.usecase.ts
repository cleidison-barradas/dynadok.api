import { QueryUserDTO, UserMongoRepository } from "../infra";

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserMongoRepository) {}

  async execute(params: QueryUserDTO) {
    return this.userRepository.listAll(params);
  }
}
