import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;
    const resfreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await resfreshTokenUseCase.execute(token);
    return response.status(200).json({ refresh_token });
  }
}

export { RefreshTokenController };
