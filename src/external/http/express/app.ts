import express from 'express';
import { router } from './routes';
import errorHandler from './errorHandler';

export class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.errorHandler();
  }

  private middleware(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(router);
  }

  private errorHandler(): void {
    this.server.use(errorHandler);
  }
}
