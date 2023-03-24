import express from "express";
import { config } from "dotenv";
config({ path: `./configs/env/.env.${process.env.NODE_ENV}` });

import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import apiDoc from "./api-docs/basicInfo";

import { appPort } from "@configs/app.config";
import metaRoutes from "@routes/meta.routes";

import { showApiDocs } from "@middlewares/misc/misc.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use("/meta", metaRoutes);
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
