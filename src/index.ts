import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}`});

import { appPort } from "./configs/app.config";

import metaRoutes from "./routes/meta.routes";

const app = express();

app.use("/meta", metaRoutes);

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