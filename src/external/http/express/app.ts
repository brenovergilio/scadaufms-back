import express from "express";
import { router } from "./routes";
import errorHandler from "./errorHandler";

export class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.routes();
    this.middleware();
  }

  private middleware(): void {
    this.server.use(express.json());
    this.server.use(errorHandler);
  }

  private routes():void {
    this.server.use(router);
  }
}