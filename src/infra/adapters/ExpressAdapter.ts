import { Request, Response } from "express"

export default class ExpressAdapter {
  static create(fn: unknown) {
    return async (req: Request, res: Response) => {
      if(fn instanceof Function) {
        const obj = await fn(req.params, req.body);
        res.json(obj);
      }
    }
  }
}