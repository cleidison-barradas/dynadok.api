import { faker } from "@faker-js/faker";
import { InMemoryUserRepository, IUser } from "../infra";
import { ListUsersUseCase } from "./list-users.usecase";

describe("ListUsersUseCase Test Suite", () => {
  let usecase: ListUsersUseCase;
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
    repository = new InMemoryUserRepository();
    usecase = new ListUsersUseCase(repository);

    const users = faker.helpers.multiple(createRandomUser, {
      count: 5,
    });

    for (const user of users) {
      await repository.createOne(user);
    }
  });

  it("Should be able to list all users", async () => {
    const response = await usecase.execute({});

    expect(response.success).toBeTruthy();

    const users = response.success ? response.data : [];

    expect(users.length).toBeGreaterThan(0);
  });
});
