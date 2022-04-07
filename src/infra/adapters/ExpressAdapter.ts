import { Request, Response } from "express"
import { GenericRepository } from "@src/usecases/repositories/GenericRepository";

export default class ExpressAdapter {
  static create(fn: unknown, repository: GenericRepository) {
    return async (req: Request, res: Response) => {
      if(fn instanceof Function) {
        const obj = await fn(req.params, req.body, repository);
         
        if (obj)
          if(obj instanceof Array) 
            obj.forEach((item) => this.replaceMapsForObjects(item));
          else
            this.replaceMapsForObjects(obj);

        res.json(obj);
      }
    }
  } 

  static replaceMapsForObjects(obj: any) {
    if(Object.prototype.hasOwnProperty.call(obj, "values")) {
      if(obj.values instanceof Map) {
        obj.values = Object.fromEntries(obj.values);
      }
    }
  }
}
