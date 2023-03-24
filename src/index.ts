import express, { type Response } from "express";
import { config } from "dotenv";

import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import apiDoc from "./api-docs/basicInfo";

import { appPort, env } from "@configs/app.config";
import metaRoutes from "@routes/meta.routes";
import taskRoutes from "@routes/task.routes";

import { showApiDocs } from "@middlewares/misc/misc.middleware";
config({ path: `./configs/env/.env.${env}` });

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use("/meta", metaRoutes);
app.use("/tasks", taskRoutes);
app.get("/ping", (_, res: Response) => {
  res.send("pong");
});

app.use("/api-docs", showApiDocs, swaggerUI.serve, swaggerUI.setup(apiDoc));

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
