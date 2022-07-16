import { NextFunction, Request, Response } from 'express';
import { GenericRepository } from '@src/entities/repositories/GenericRepository';
import MeasurerChecker from '@src/entities/interfaces/MeasurerChecker';

export default class ExpressAdapter {
  static create(
    fn: unknown,
    expectedStatusCode: number,
    measurerChecker?: MeasurerChecker,
    ...repositories: GenericRepository[]
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (fn instanceof Function) {
          const obj = measurerChecker
            ? await fn(
              req.params,
              req.body,
              req.query,
              req.headers,
              ...repositories,
              measurerChecker
            )
            : await fn(
              req.params,
              req.body,
              req.query,
              req.headers,
              ...repositories
            );

          if (obj)
            if (obj instanceof Array)
              obj.forEach((item) => this.replaceMapsForObjects(item));
            else this.replaceMapsForObjects(obj);

          res.status(expectedStatusCode).json(obj);
        }
      } catch (error) {
        next(error);
      }
    };
  }

  static replaceMapsForObjects(obj: any) {
    if (Object.prototype.hasOwnProperty.call(obj, 'values')) {
      if (obj.values instanceof Map) {
        obj.values = Object.fromEntries(obj.values);
      }
    }
  }
}
