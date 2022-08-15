import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


class ListAvailableCarsController {

  async handle(request: Request, response: Response): Promise<void> {
    const { name, brand, category_id } = request.query;
    
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);
    const availableCars = await listAvailableCarsUseCase.execute({ name: name as string, brand: brand as string, category_id: category_id as string });
    if(!availableCars || availableCars.length === 0) {
      response.status(204).send();
      return;
    }

    response.json(availableCars);
  }

}

export { ListAvailableCarsController }