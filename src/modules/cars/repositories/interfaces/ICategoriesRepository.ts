import { Category } from "../../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICatergoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICatergoriesRepository, ICreateCategoryDTO }