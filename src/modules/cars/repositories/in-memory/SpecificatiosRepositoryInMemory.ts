import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  private specification: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specification.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specification.find((spe) => spe.name === name);

    return specification;
  }

  async list(): Promise<Specification[]> {
    const { specification } = this;

    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specification.filter((spe) => {
      return ids.includes(spe.id);
    });

    return allSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };
