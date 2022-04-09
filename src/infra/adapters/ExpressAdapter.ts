import { NextFunction, Request, Response } from "express"
import { GenericRepository } from "@src/usecases/repositories/GenericRepository";

export default class ExpressAdapter {
  static create(fn: unknown, repository: GenericRepository, expectedStatusCode: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if(fn instanceof Function) {
          const obj = await fn(req.params, req.body, repository);
          
          if (obj)
            if(obj instanceof Array) 
              obj.forEach((item) => this.replaceMapsForObjects(item));
            else
              this.replaceMapsForObjects(obj);
  
          res.status(expectedStatusCode).json(obj);
        }
      } catch(error) {
          next(error);
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
