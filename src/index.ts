import express from "express";

import morgan from "morgan";
import cors from "cors";

import { appPort } from "@configs/app.config";
import routes from "@routes/index";

import { type Server } from "http";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";

// Falls back to dotenv.config if issues, so sending path as well.

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const start = (): Server => {
  try {
    const server = app.listen(appPort, () => {
      console.log(`Server started on port ${appPort}`);
    });

    return server;
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    process.exit(1);
  }
};

const server = start();
export default server;
