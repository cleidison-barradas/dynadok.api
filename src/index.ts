import "dotenv/config";
import { App } from "./app";
import { logger } from "./application/lib";
import { MongoDB } from "./application/infra";
import { httpConfig, mongoConfig } from "./config";

export default (async () => {
  const mongo = new MongoDB(mongoConfig);
  const app = new App(httpConfig);

  const connection = await mongo.connect();
  const server = await app.startServer();

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);

  function gracefulShutdown(signal: NodeJS.Signals) {
    logger.info(`Received [${signal}] - shutting down gracefully`);
    try {
      connection.close().then(() => {
        logger.info("MongoDB connection closed");
        server.close((err) => {
          if (err) {
            logger.error(`There was an error closing the server: ${err}`);
            process.exit(1);
          } else {
            logger.info("Http server closed gracefully");
            process.exit(0);
          }
        });
      });
    } catch (error) {
      logger.error(`There was an error closing the server: ${error}`);
      process.exit(1);
    }
  }
})();
