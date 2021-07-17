import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const fileNames = images.map((files) => files.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name: fileNames,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
