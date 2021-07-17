import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolitionRentalUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayJsDateProvider')
    private dateJsDateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const minimum_daily = 1;
    if (!rental) {
      throw new AppError('Rental does not exists');
    }
    const car = await this.carsRepository.findById(rental.car_id);
    const dateNow = this.dateJsDateProvider.dateNow();

    let daily = this.dateJsDateProvider.compareInDays(
      rental.start_date,
      this.dateJsDateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateJsDateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateJsDateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolitionRentalUseCase };
