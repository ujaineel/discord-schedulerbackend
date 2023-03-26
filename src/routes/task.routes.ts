import { getTaskController } from "@controllers/tasks.controllers";
import { Router } from "express";

const router: Router = Router();

router.get("/:id", getTaskController);

export default router;
