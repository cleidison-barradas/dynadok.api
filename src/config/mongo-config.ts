type MongoConfig = {
  uri: string;
};

export const mongoConfig: MongoConfig = {
  uri: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
    process.env.MONGO_INITDB_ROOT_PASSWORD
  }@${process.env.MONGO_INITDB_HOST || "localhost"}:${
    process.env.MONGO_INITDB_PORT || 27017
  }/${process.env.MONGO_INITDB_DATABASE || "mydb"}?authSource=admin`,
};
