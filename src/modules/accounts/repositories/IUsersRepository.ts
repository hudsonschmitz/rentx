import { ICreateUserDTO } from "../dtos/CreateUserDTO"
import { User } from "../entities/User";


interface IUsersRepository {

  create(date: ICreateUserDTO): Promise<void>;

  findById(email: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

}

export { IUsersRepository }