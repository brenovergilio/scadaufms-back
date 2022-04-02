import express from "express";
import { router } from "./routes";

export class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.server.use(express.json());
  }

  private routes():void {
    this.server.use(router);
  }
}