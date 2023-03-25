import express, { type Response } from "express";
import { config } from "dotenv";

import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerOutput from "@root/swaggerOutput.json";

import { appPort, env } from "@configs/app.config";
import routes from "@routes/index";

import { showApiDocs } from "@middlewares/misc/misc.middleware";

config({ path: `./configs/env/.env.${env}` });

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use(routes);
app.get("/ping", (_, res: Response) => {
  res.send("pong");
});

app.use(
  "/api-docs",
  showApiDocs,
  swaggerUI.serve,
  swaggerUI.setup(swaggerOutput)
);

const start = async (): Promise<void> => {
  try {
    app.listen(appPort, () => {
      console.log(`Server started on port ${appPort}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
