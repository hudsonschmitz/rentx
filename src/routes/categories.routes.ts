import { Router } from 'express';
import multer from 'multer';
import { ImportCategoriesController } from '../modules/cars/useCases/importCategories/ImportCategoriesController';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const upload = multer({
  dest: "./temp",
})

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post("/import",  ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoriesController.handle);

export { categoriesRoutes }