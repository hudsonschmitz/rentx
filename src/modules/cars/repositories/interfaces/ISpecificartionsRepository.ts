import { Specifications } from "../../entities/Specifications";


interface ISpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {

  create({ name, description }: ISpecificationsDTO): Promise<void>;
  list(): Promise<Specifications[]>;
  findByName(name: string): Promise<Specifications>;

}

export { ISpecificationsRepository, ISpecificationsDTO }