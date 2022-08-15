import { Car } from "@modules/cars/entities/Car";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/interfaces/ICarsRepository"

interface IRequest {
  name?: string; 
  brand?: string; 
  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRespository: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    const cars = await this.carsRespository.findAvailables(name, brand, category_id);
    return cars;
  }
}

export { ListAvailableCarsUseCase }