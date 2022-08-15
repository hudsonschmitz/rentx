import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { Request, Response } from "express";
import { container, inject } from "tsyringe";


class ListSpecificationsController {

 async  handle(request: Request, response: Response): Promise<Response>  {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);
    const specificationsList = await listSpecificationsUseCase.execute();

    return response.json(specificationsList);

  }

}

export { ListSpecificationsController }