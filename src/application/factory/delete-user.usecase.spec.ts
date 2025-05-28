import { faker } from "@faker-js/faker";
import { InMemoryUserRepository, IUser } from "../infra";
import { DeleteUserUseCase } from "./delete-user.usecase";
import { TResult } from "../helpers/result";

describe("DeleteUserUseCase Test Suite", () => {
  let usecase: DeleteUserUseCase;
  let repository: InMemoryUserRepository;

  let user: IUser | null = null;
  let userMock: IUser | null = null;

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
    usecase = new DeleteUserUseCase(repository);

    const result = await repository.createOne(userMock);
    user = result.success ? result.data : null;
  });

  it("Shuld be able to delete user", async () => {
    const response = (await usecase.execute(user._id)) as TResult<IUser>;

    const deletedId = response.success ? response.data : null;

    expect(deletedId).not.toBeNull();
    expect(deletedId).toBe(user._id);
  });

  it("Should not be able to delete user with invalid id", async () => {
    const response = (await usecase.execute(
      faker.string.uuid(),
    )) as TResult<IUser>;

    expect(response.success).toBe(false);
    expect(response.code).toBe(404);
  });
});
