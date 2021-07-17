import { AppError } from '@errors/AppError';
import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificatiosRepositoryInMemory';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should not be able to add a new specification to a now-existent car', async () => {
    const car_id = '1234';
    const specifications_id = ['56789'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError('Car does not exists'));
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'a7',
      description: 'Coupe car',
      brand: 'Audi',
      category_id: 'Sedan coupe',
      daily_rate: 1200,
      fine_amount: 60,
      license_plate: 'emr-0000',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCar).toHaveProperty('specifications');
    expect(specificationsCar.specifications.length).toBe(1);
  });
});
