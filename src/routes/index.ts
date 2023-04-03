import { type Response, Router } from "express";

import metaRouter from "./meta.routes";
import taskRouter from "./task.routes";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";

import swaggerUI from "swagger-ui-express";
import swaggerOutput from "@root/swaggerOutput.json";
import { showApiDocs } from "@middlewares/misc/misc.middleware";

const router: Router = Router();

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
