import { Router } from "express";

import metaRouter from "./meta.routes";
import taskRouter from "./task.routes";

const router: Router = Router();

// MISC ROUTES
router.use("/meta", metaRouter);

// TASK ROUTES
router.use("/tasks", taskRouter);

// USER ROUTES

// AUTH ROUTES

export default router;
