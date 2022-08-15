import fs from 'fs';
import { parse } from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository) {
  }

  loadFile(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
  
      const parseFile = parse();
  
      stream.pipe(parseFile);
  
      parseFile.on('data', async (line) => {
        const [ name, description] = line;
        categories.push({
          name,
          description
        });
      })
      .on("end", () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      })
      .on("error", (error) => {
        reject(error);
      })
    });
    
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadFile(file);
    categories.map(async category => {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

      if(!categoryAlreadyExists) {
        await this.categoriesRepository.create({ 
          name, 
          description
        });
      }
    });
    
  }

}

export { ImportCategoriesUseCase }