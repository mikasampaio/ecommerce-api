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

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });

    return category?.toObject<Category>();
  }

  async findById(id: string): Promise<Category | undefined> {
    const category = await this.repository.findById(id);

    return category?.toObject<Category>();
  }
}
