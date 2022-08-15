import { Car } from "@modules/cars/entities/Car";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarRepositoryInMemory;

describe("List cars", () => {

  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  })

  it("should be able to list all available cars.", async () => {
    const newCar = await carsRepository.create({
      name: "Car supertest 1",
      description: "Supertest description 1",
      daily_rate: 150,
      license_plate: "XXXXXXX",
      fine_amount: 50,
      brand: "Supertest brand 1",
      category_id: "1234"
    });
    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([newCar]);
  })

  it("should be able to list all available cars filtered by name.", async () => {
    const newCar1 = await carsRepository.create({
      name: "Car supertest 1",
      description: "Supertest description 1",
      daily_rate: 150,
      license_plate: "XXXXXXX",
      fine_amount: 50,
      brand: "Supertest brand 1",
      category_id: "1234"
    });
    const newCar2 = await carsRepository.create({
      name: "Car supertest 2",
      description: "Supertest description 2",
      daily_rate: 150,
      license_plate: "XXXXXXX",
      fine_amount: 50,
      brand: "Supertest brand 2",
      category_id: "1234"
    });
    
    const cars = await listCarsUseCase.execute({name: "Car supertest 2"});

    expect(cars).toEqual([newCar2]);
  })

  it("should be able to list all available cars filtered by name.", async () => {
    const newCar1 = await carsRepository.create({
      name: "Car supertest 1",
      description: "Supertest description 1",
      daily_rate: 150,
      license_plate: "XXXXXXX",
      fine_amount: 50,
      brand: "Supertest brand 1",
      category_id: "1234"
    });
    const newCar2 = await carsRepository.create({
      name: "Car supertest 3",
      description: "Supertest description 3",
      daily_rate: 150,
      license_plate: "XXXXXXX",
      fine_amount: 50,
      brand: "Supertest brand 3",
      category_id: "1234"
    });
    
    const cars = await listCarsUseCase.execute({ brand: "Supertest brand 3" });

    expect(cars).toEqual([newCar2]);
  })

  it("should be able to list all available cars filtered by name.", async () => {
    const newCar1 = await carsRepository.create({
      name: "Car supertest 1",
      description: "Supertest description 1",
      daily_rate: 150,
      license_plate: "XXXXXXX",
      fine_amount: 50,
      brand: "Supertest brand 1",
      category_id: "1234"
    });
    const newCar2 = await carsRepository.create({
      name: "Car supertest 4",
      description: "Supertest description 4",
      daily_rate: 150,
      license_plate: "XXXXXXX",
      fine_amount: 50,
      brand: "Supertest brand 4",
      category_id: "1234567"
    });
    
    const cars = await listCarsUseCase.execute({ category_id: "1234567" });

    expect(cars).toEqual([newCar2]);
  })

})