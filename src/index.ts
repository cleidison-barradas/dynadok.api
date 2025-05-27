import "dotenv/config";
import { App } from "./app";
import { httpConfig } from "./config";

const app = new App(httpConfig);

app.start();
