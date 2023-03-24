import { taskController } from "@controllers/tasks.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/:id", taskController.getTask);

export default router;
