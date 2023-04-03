import { type Response, Router } from "express";

import metaRouter from "./meta.routes";
import taskRouter from "./task.routes";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";

import swaggerUI from "swagger-ui-express";
import swaggerOutput from "@root/swaggerOutput.json";
import { showApiDocs } from "@middlewares/misc/misc.middleware";
import RateLimit from "express-rate-limit";
import { env } from "@configs/app.config";
import { ENV } from "@utils/types/app.types";

const router: Router = Router();

if (env === ENV.PRODUCTION || env === ENV.TESTING || env === ENV.DEVELOPMENT) {
  // set up rate limiter: maximum of five requests per minute
  const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,
  });
  router.use(limiter);
}
// MISC ROUTES
router.use("/meta", metaRouter);

// TASK ROUTES
router.use("/tasks", taskRouter);

// USER ROUTES
// AUTH ROUTES
router.use("/auth", authRouter);
router.use(userRouter);

// SWAGGER/OPEN API ROUTE
router.get(
  "/api-docs",
  showApiDocs,
  swaggerUI.serve,
  swaggerUI.setup(swaggerOutput)
);

// MISC
router.get("/ping", (_, res: Response) => {
  res.send("pong");
});

export default router;
