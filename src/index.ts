import { configFn } from "./main";
import express from "express";

import morgan from "morgan";
import cors from "cors";

import { appPort, env } from "@configs/app.config";
import routes from "@routes/index";

import { type Server } from "http";
import session from "express-session";
import cookieParser from "cookie-parser";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import passport from "passport";
import { authSetup } from "./modules/auth/local/passportConfig";
import { ENV } from "@utils/types/app.types";
import { PrismaClient } from "@prisma/client";

configFn();
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const store = new PrismaSessionStore(new PrismaClient(), {
  checkPeriod: 2 * 60 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

const secret =
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.SESSION_SECRET!;

app.use(cookieParser(secret));

app.use(
  session({
    store,
    secret,
    resave: false,
    saveUninitialized: false,
    // TODO: Enforcing SSL encryption
    cookie: {
      httpOnly: !(env === ENV.PRODUCTION),
      secure: env === ENV.PRODUCTION,
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Local Auth Setup
authSetup(passport);

app.use(cookieParser(secret));

app.use(
  session({
    secret,
    resave: true,
    saveUninitialized: false,
    // TODO: Enforcing SSL encryption
    cookie: { httpOnly: !(env === ENV.CI || env === ENV.DEVELOPMENT) },
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
