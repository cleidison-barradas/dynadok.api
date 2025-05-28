import { InMemoryUserRepository } from "@/application/infra/database";
import { CreateUserUseCase } from "./create-user.usecase";
import { TResult } from "@/application/helpers/result";
import { IUser } from "../infra";
import { faker } from "@faker-js/faker";

describe("CreateUserUseCase", () => {
  let userMock: IUser | null = null;
  let usecase: CreateUserUseCase;
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

  beforeEach(() => {
    userMock = {
      ...userMock,
      ...createRandomUser(),
    };
    repository = new InMemoryUserRepository();
    usecase = new CreateUserUseCase(repository);
  });

  it("Should be able to create a new user", async () => {
    const response = (await usecase.execute(userMock)) as TResult<IUser>;

    const user = response.success ? response.data : null;

    expect(user).not.toBeNull();
    expect(user).toHaveProperty("_id");
    expect(user).toHaveProperty("name", userMock.name);
    expect(user).toHaveProperty("email", userMock.email);
    expect(user).toHaveProperty("phone", userMock.phone);
  });

  it("Should not be able to create na new user it the same email", async () => {
    await repository.createOne(userMock);

    const response = (await usecase.execute(userMock)) as TResult<IUser>;

    expect(response.success).toBe(false);
    expect(response.code).toBe(400);
  });
});
