import { Request, Response } from "express";
import { Controller } from "../application/infra/interfaces";

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req);
    res.status(httpResponse.code).json(httpResponse);
  };
};
