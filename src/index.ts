import express from "express";

import morgan from "morgan";
import cors from "cors";

import { appPort } from "@configs/app.config";
import routes from "@routes/index";

import { type Server } from "http";
import session from "express-session";
import cookieParser from "cookie-parser";

import passport from "passport";
import { authSetup } from "./modules/auth/local/passportConfig";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

const secret =
  process.env?.SESSION_SECRET ??
  "oooooeoeroewroewsfjndxvbnfdhjigbdfg4654ertijdbgner";

app.use(cookieParser(secret));

app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Local Auth Setup
authSetup(passport);

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
