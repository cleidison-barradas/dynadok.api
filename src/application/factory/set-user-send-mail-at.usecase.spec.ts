import { faker } from "@faker-js/faker";
import { InMemoryUserRepository, IUser } from "../infra";
import { SetMailSendAtUseCase } from "./set-user-send-mail-at.usecase";
import { TResult } from "../helpers";

describe("SetUserSendMailAtUseCase Test Suite", () => {
  let usecase: SetMailSendAtUseCase;
  let repository: InMemoryUserRepository;
  let userMock: IUser | null = null;
  let user: IUser | null = null;

  function createRandomUser(): IUser {
    return {
      name: faker.internet.displayName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
      salt: Math.random().toString(36).substring(7),
    };
  }

  beforeEach(async () => {
    userMock = {
      ...userMock,
      ...createRandomUser(),
    };

    repository = new InMemoryUserRepository();
    const result = await repository.createOne(userMock);
    user = result.success ? result.data : null;
    usecase = new SetMailSendAtUseCase(repository);
  });

  it("Should be able to update user emailVerifiedAt", async () => {
    const emailVerifiedAt = new Date();
    const response = (await usecase.execute(
      user._id,
      emailVerifiedAt,
    )) as TResult<IUser>;

    const userUpdated = response.success ? response.data : null;

    expect(userUpdated).not.toBeNull();
    expect(userUpdated).toHaveProperty("emailVerifiedAt", emailVerifiedAt);
  });

  it("Should not be able to update user emailVerifiedAt with invalid id", async () => {
    try {
      await usecase.execute(faker.string.uuid(), new Date());
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("User not found");
    }
  });
});
