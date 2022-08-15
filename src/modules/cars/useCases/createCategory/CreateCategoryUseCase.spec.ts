import { AppError } from "../../../../errors/AppError";
import { CategoryRepositoryInMemory } from "../../repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("should be able to create a new category", async  () => {
    const category = {
      name: "Category Test",
      description: "Category description teste"
    }
    await createCategoryUseCase.execute({ 
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with a existing name", async  () => {

    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description teste"
      }
      await createCategoryUseCase.execute({ 
        name: category.name,
        description: category.description
      });
  
      await createCategoryUseCase.execute({ 
        name: category.name,
        description: category.description
      });

    }).rejects.toBeInstanceOf(AppError);
  });

});