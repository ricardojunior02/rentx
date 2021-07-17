import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private respository: Repository<Car>;

  constructor() {
    this.respository = getRepository(Car);
  }
  async create({
    name,
    description,
    category_id,
    daily_rate,
    fine_amount,
    brand,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.respository.create({
      name,
      description,
      category_id,
      daily_rate,
      fine_amount,
      brand,
      license_plate,
      id,
      specifications,
    });

    await this.respository.save(car);

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.respository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }

    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.respository.findOne({ license_plate });
    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.respository.findOne(id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.respository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id =:id')
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
