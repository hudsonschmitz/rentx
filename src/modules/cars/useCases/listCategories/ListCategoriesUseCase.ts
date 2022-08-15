import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";


@injectable()
class ListCategoriesUseCase {

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository) {
  }

  async execute(): Promise<Category[]> {
    const list = await this.categoriesRepository.list();
    return list;
  }

}

export { ListCategoriesUseCase }