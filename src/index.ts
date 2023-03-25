import express, { type Response } from "express";

import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerOutput from "@root/swaggerOutput.json";

import { appPort } from "@configs/app.config";
import routes from "@routes/index";

import { showApiDocs } from "@middlewares/misc/misc.middleware";
import { type Server } from "http";

// Falls back to dotenv.config if issues, so sending path as well.

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

const start = (): Server => {
  try {
    const server = app.listen(appPort, () => {
      console.log(`Server started on port ${appPort}`);
    });

    return server;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const server = start();
export default server;
