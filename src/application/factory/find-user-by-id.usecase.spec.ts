import { faker } from "@faker-js/faker";
import { InMemoryUserRepository, IUser } from "../infra";
import { FindUserByIdUseCase } from "./find-user-by-id.usecase";

describe("FindUserByIdUseCase Test Suite", () => {
  let usecase: FindUserByIdUseCase;
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
    usecase = new FindUserByIdUseCase(repository);

    const users = faker.helpers.multiple(createRandomUser, {
      count: 5,
    });

    for (const user of users) {
      await repository.createOne(user);
    }
  });

  it("Should be able to find user by id", async () => {
    const results = await repository.listAll({});

    const id = results.success ? results.data[0]._id : null;

    const response = await usecase.execute(id);

    const user = response.success ? response.data : null;

    expect(user).toHaveProperty("_id", id);
  });

  it("Should be able to find user by invalid id", async () => {
    try {
      await usecase.execute(faker.string.uuid());
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("User not found");
    }
  });
});
