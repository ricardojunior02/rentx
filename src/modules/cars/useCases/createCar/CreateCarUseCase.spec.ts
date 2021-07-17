import { AppError } from '@errors/AppError';
import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'a7',
      description: 'Coupe car',
      brand: 'Audi',
      category_id: 'Sedan coupe',
      daily_rate: 1200,
      fine_amount: 60,
      license_plate: 'emr-0000',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with the exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'a7 1',
      description: 'Coupe car',
      brand: 'Audi',
      category_id: 'Sedan coupe',
      daily_rate: 1200,
      fine_amount: 60,
      license_plate: 'emr-0000',
    });

    await expect(
      createCarUseCase.execute({
        name: 'a7 2',
        description: 'Coupe car',
        brand: 'Audi',
        category_id: 'Sedan coupe',
        daily_rate: 1200,
        fine_amount: 60,
        license_plate: 'emr-0000',
      })
    ).rejects.toEqual(new AppError('Car already exists'));
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'a7 2',
      description: 'Coupe car',
      brand: 'Audi',
      category_id: 'Sedan coupe',
      daily_rate: 1200,
      fine_amount: 60,
      license_plate: 'emr-0000',
    });

    expect(car.available).toBe(true);
  });
});
