import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string,
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if(!user) {
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    const token = sign({}, "hudzord", {
      subject: user.id,
      expiresIn: '1d'
    });

    const response: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token: token
    } 

    return response;

  }

}

export { AuthenticateUserUseCase }