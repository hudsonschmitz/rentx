import { AppError } from "@errors/AppError";
import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCarUseCase {

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
    
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);
    
    if(carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      name, 
      description, 
      daily_rate, 
      license_plate, 
      fine_amount, 
      brand, 
      category_id
    });

    return car;

  }
}

export { CreateCarUseCase }