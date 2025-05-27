import express, { Application } from "express";
import PinoHttp from "pino-http";
import cors from "cors";

import { logger, serializers } from "./application/lib";

type AppConfig = {
  port?: number;
};

export class App {
  public port: number;
  private app: Application;

  constructor({ port = 8000 }: AppConfig) {
    this.port = port;
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.init();
  }

  private init() {
    this.initPlugins();
    this.initMiddlewares();
    this.initRoutes();
  }

  public getSever() {
    return this.app;
  }

  public async start() {
    this.app.listen(this.port, () => {
      logger.info(`Server running on port: ${this.port}`);
    });
  }

  private initRoutes() {}

  private initMiddlewares() {}

  private initPlugins() {
    this.app.use(
      PinoHttp({
        logger,
        serializers,
      }),
    );
  }
}
