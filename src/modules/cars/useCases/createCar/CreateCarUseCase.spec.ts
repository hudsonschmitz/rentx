import { AppError } from "@errors/AppError";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
  })

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "APD2107", 
      fine_amount: 500, 
      brand: "Toyota", 
      category_id: "category"
    });
  });

  it("should not be able to create a new car with a license_plate that already exists", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car1", 
        description: "Description Car", 
        daily_rate: 100, 
        license_plate: "APD2107", 
        fine_amount: 500, 
        brand: "Toyota", 
        category_id: "category"
      });

      await createCarUseCase.execute({
        name: "Name Car2", 
        description: "Description Car", 
        daily_rate: 100, 
        license_plate: "APD2107", 
        fine_amount: 500, 
        brand: "Toyota", 
        category_id: "category"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with a available property true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Available", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "APD2107", 
      fine_amount: 500, 
      brand: "Toyota", 
      category_id: "category"
    });
    expect(car.available).toBe(true);
  });
});