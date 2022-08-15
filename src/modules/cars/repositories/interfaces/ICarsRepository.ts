import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";


interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailables(name?: string, brand?: string, category_id?: string): Promise<Car[]>;
}

export { ICarsRepository }