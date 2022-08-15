import { Router } from 'express';
import { CreateSpecificationsController } from '../modules/cars/useCases/createSpecification/CreateSpecificationsController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationRoutes = Router();

const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationsController.handle);

specificationRoutes.get("/", listSpecificationsController.handle);

export { specificationRoutes }