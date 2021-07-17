import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvailableUseCar = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableUseCar.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    });

    return response.status(200).json(cars);
  }
}

export { ListAvailableCarsController };
