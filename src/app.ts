import express, { Application, Router } from "express";
import PinoHttp from "pino-http";
import path from "node:path";
import cors from "cors";

import { logger, serializers } from "./application/lib";
import routes from "./application/infra/routes";
const appRouter = Router();

type AppConfig = {
  port: number;
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
    this.initRoutes();
  }

  public getServer() {
    return this.app;
  }

  public async startServer() {
    return this.app.listen(this.port, () => {
      logger.info(`Server running on port: ${this.port}`);
    });
  }

  private initRoutes() {
    Object.keys(routes).forEach((key) => {
      const _route = routes[key];

      appRouter.use(path.join("/", key), _route);
    });

    this.app.use("/api", appRouter);
  }

  private initPlugins() {
    this.app.use(
      PinoHttp({
        logger,
        serializers,
      }),
    );
  }
}
