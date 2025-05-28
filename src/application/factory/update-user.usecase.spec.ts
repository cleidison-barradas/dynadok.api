import { faker } from "@faker-js/faker";
import { TResult } from "../helpers/result";
import { InMemoryUserRepository, IUser } from "../infra";
import { UpdateUserUseCase } from "./update-user.usecase";

describe("UpdateUserUseCase Test Suite", () => {
  let userMock: IUser | null = null;
  let user: IUser | null = null;
  let usecase: UpdateUserUseCase;
  let repository: InMemoryUserRepository;

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
    usecase = new UpdateUserUseCase(repository);
  });

  it("Should be able to update user", async () => {
    const userMockUpdate = {
      id: user._id,
      name: "test_1",
      phone: "0",
    };

    const response = (await usecase.execute(
      user._id,
      userMockUpdate,
    )) as TResult<IUser>;

    const userUpdated = response.success ? response.data : null;

    expect(userUpdated).not.toBeNull();
    expect(userUpdated).toHaveProperty("name", userMockUpdate.name);
    expect(userUpdated).toHaveProperty("phone", userMockUpdate.phone);
  });
});
