import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });
  it('should be a list of cars available', async () => {
    const car = await carsRepository.create({
      name: 'a3',
      description: 'coupe',
      category_id: '73cbf46b-5fce-4004-8ca1-152d62cedfa0',
      daily_rate: 60,
      fine_amount: 1200,
      brand: 'audi',
      license_plate: 'eee-2020',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      name: 'a3',
      description: 'coupe',
      category_id: '73cbf46b-5fce-4004-8ca1-152d62cedfa0',
      daily_rate: 60,
      fine_amount: 1200,
      brand: 'audi',
      license_plate: 'eee-2020',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'audi',
    });

    expect(cars).toEqual([car]);
  });
});
