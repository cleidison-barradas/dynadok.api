import { sha1 } from "js-sha1";
import { CreateUserDTO, Repository } from "../infra";

export class CreateUserUseCase {
  constructor(private readonly userRepository: Repository) {}
  async execute(data: CreateUserDTO) {
    const salt = Math.random().toString(36).substring(7);
    const encryptedPassword = sha1(salt + sha1(salt + sha1(data.password)));

    return this.userRepository.createOne({
      email: data.email,
      name: data.name,
      phone: data.phone,
      salt,
      password: encryptedPassword,
    });
  }
}
