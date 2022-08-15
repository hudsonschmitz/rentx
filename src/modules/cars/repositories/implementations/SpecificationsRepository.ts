import { getRepository, Repository } from "typeorm";
import { Specifications } from "../../entities/Specifications";
import { ISpecificationsDTO, ISpecificationsRepository } from "../interfaces/ISpecificartionsRepository";


class SpecificationsRepository implements ISpecificationsRepository {

  private repository: Repository<Specifications>;

  constructor() {
    this.repository = getRepository(Specifications);
  }

  async create({ name, description }: ISpecificationsDTO): Promise<void> {

    const specification = this.repository.create({
      name,
      description
    });

    await this.repository.save(specification);

  }

  async list(): Promise<Specifications[]> {
    const allSpecifications = await this.repository.find();
    return allSpecifications;
  }

  async findByName(name: string): Promise<Specifications> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

}

export { SpecificationsRepository }