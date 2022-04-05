import { Request, Response } from "express"
import { GenericRepository } from "@src/usecases/repositories/GenericRepository";

export default class ExpressAdapter {
  static create(fn: unknown, repository: GenericRepository) {
    return async (req: Request, res: Response) => {
      if(fn instanceof Function) {
        const obj = await fn(req.params, req.body, repository);
        res.json(obj);
      }
    }
  }
}