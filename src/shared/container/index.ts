import { container } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { ICatergoriesRepository } from "@modules/cars/repositories/interfaces/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/interfaces/ISpecificartionsRepository";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { CarsRepository } from "@modules/cars/repositories/implementations/CarsRepository";



container.registerSingleton<ICatergoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
);
