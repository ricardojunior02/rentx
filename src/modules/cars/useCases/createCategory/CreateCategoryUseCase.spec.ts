import { AppError } from '@errors/AppError';
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe('Create category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Description test',
    };
    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoryRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with the same name', async () => {
    const category = {
      name: 'Category test',
      description: 'Description test',
    };

    await createCategoryUseCase.execute(category);
    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category already exists')
    );
  });
});
