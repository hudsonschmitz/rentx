import "reflect-metadata"
import { inject, injectable } from "tsyringe"
import { ICreateUserDTO } from "../../dtos/CreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { hash } from 'bcryptjs';
import { AppError } from "@errors/AppError";


@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ){}

  async execute({name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

    const userEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if(userEmailAlreadyExists) {
      throw new AppError("This email has already been taken.")
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name, 
      email, 
      password: passwordHash, 
      driver_license
    });

  }

}

export { CreateUserUseCase }