/* eslint-disable @typescript-eslint/no-require-imports */
import fs from "fs";
import path from "node:path";
import mongoose from "mongoose";
import { logger } from "@/application/lib";

type MongoDBProps = {
  uri: string;
};

export class MongoDB {
  private uri: string;
  private mongoConnection: mongoose.Connection;

  constructor(props: MongoDBProps) {
    this.uri = props.uri;
  }

  public async connect() {
    this.mongoConnection = mongoose.createConnection(this.uri);

    this.mongoConnection.on("connected", async () => {
      logger.info("Connected to MongoDB");
      await this.loadModels();
    });

    return this.mongoConnection;
  }

  private async loadModels(): Promise<void> {
    const modelsPath = path.join(__dirname, "./models");

    const files = fs.readdirSync(modelsPath);

    for (const file of files) {
      if (file.endsWith(".model.ts") || file.endsWith(".model.js")) {
        const modelSchema = require(path.join(modelsPath, file)).default;

        const model = this.mongoConnection.model(
          modelSchema._schemaName.toLowerCase(),
          modelSchema._schemaDefinition,
        );

        modelSchema._setModel(model);

        await model.syncIndexes();
      }
    }
  }
}
