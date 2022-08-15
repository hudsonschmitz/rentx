import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";
import { getRepository, Repository } from "typeorm";
import { ICarsRepository } from "../interfaces/ICarsRepository";



class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({ 
      name, 
      description, 
      daily_rate, 
      license_plate, 
      fine_amount, 
      brand, 
      category_id 
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailables(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
    const carsQuery = this.repository.
      createQueryBuilder("car").
      where("available = :available ", { available: true })

    if(name) {
      carsQuery.andWhere("car.name = :name", { name })
    }
    if(brand) {
      carsQuery.andWhere("car.brand = :brand", { brand })
    }
    if(category_id) {
      carsQuery.andWhere("car.category_id = :category_id", { category_id })
    }
    return carsQuery.getMany();
  }
  
}

export { CarsRepository }