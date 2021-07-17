import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      license_plate,
      fine_amount,
      daily_rate,
      category_id,
      description,
      name,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      license_plate,
      fine_amount,
      daily_rate,
      category_id,
      description,
      name,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
