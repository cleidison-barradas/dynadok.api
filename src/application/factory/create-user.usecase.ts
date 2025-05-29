import { sha1 } from "js-sha1";
import { CreateUserDTO, Repository } from "src/application/infra";
import { BadRequestError } from "../errors";

export class CreateUserUseCase {
  constructor(private readonly userRepository: Repository) {}
  async execute(data: CreateUserDTO) {
    const result = await this.userRepository.findByEmail(data.email);

    const user = result.success ? result.data : null;

    if (user) {
      throw new BadRequestError("User already exists");
    }

    const salt = Math.random().toString(36).substring(7);
    const encryptedPassword = sha1(salt + sha1(salt + sha1(data.password)));

    return this.userRepository.createOne({
      email: data.email,
      name: data.name,
      phone: data.phone,
      salt: salt,
      password: encryptedPassword,
    });
  }
}
