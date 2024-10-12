import { Category } from '../../entities/classes/category';
import { CategoryModel } from '../schemas/category';

export class CategoryRepository {
  constructor(private repository: typeof CategoryModel) {}

  async create({ name }: Category): Promise<Category> {
    const createdCategory = await this.repository.create({ name });

    return createdCategory.toObject<Category>();
  }

  async get(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories.map((category) => category.toObject<Category>());
  }

  async update(
    id: string,
    data: Partial<Category>,
  ): Promise<Category | undefined> {
    const updatedCategory = await this.repository.findByIdAndUpdate(
      id,
      { $set: { ...data, 'status.updatedAt': new Date() } },
      { new: true },
    );

    return updatedCategory?.toObject<Category>();
  }

  async delete(id: string): Promise<Category | null> {
    const deletedCategory = await this.repository.findByIdAndDelete(id, {
      'status.deletedAt': new Date(),
    });

    return deletedCategory;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });

    return category?.toObject<Category>();
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.repository.findById(id);

    return category?.toObject<Category>();
  }
}
