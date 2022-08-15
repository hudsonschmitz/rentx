import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let userRepository: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate user", () => {

  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it("should be able to authenticate an existing user", async () => {

    const user: ICreateUserDTO = {
      name: "Hudson",
      email: "hudson.schmitz12@gmail.com",
      password: "senha123",
      driver_license: "000123"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: "hudson.schmitz12@gmail.com",
      password: "senha123"
    });

    expect(result).toHaveProperty("token");

  });

  it("should not be able to authenticate an user with an non existing email", () => {
    expect(async () => {
      const result = await authenticateUserUseCase.execute({
        email: "hudson.schmitz12@gmail.com",
        password: "senha123"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with a wrong password", async () => {
    const user: ICreateUserDTO = {
      name: "Hudson",
      email: "hudson.schmitz12@gmail.com",
      password: "senha123",
      driver_license: "000123"
    };

    await createUserUseCase.execute(user);

    
    await expect(
      authenticateUserUseCase.execute({
      email: "hudson.schmitz12@gmail.com",
      password: "senhaErrada"
    })).rejects.toBeInstanceOf(AppError);
  });

})