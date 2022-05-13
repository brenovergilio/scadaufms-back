import express from 'express';
import { router } from './routes';
import errorHandler from './errorHandler';
import cors from 'cors';

export class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.enableCors();
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

  private enableCors(): void {
    const allowedOrigins = ['http://localhost:4200'];
    const options: cors.CorsOptions = {
      origin: allowedOrigins,
    };

    this.server.use(cors(options));
  }
}
