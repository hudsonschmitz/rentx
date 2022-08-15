import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/cars", carsRoutes);

router.use("/users", usersRoutes);

router.use(authenticateRoutes);

router.use(ensureAuthenticated);

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);




export { router }