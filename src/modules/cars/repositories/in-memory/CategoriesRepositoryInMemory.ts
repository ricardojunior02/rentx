import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoryRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      description,
      name,
    });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    const { categories } = this;

    return categories;
  }
}

export { CategoryRepositoryInMemory };
