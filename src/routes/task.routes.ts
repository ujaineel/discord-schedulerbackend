import taskController from "@controllers/tasks.controllers";
import { Router } from "express";

const router: Router = Router();

router.get("/:id", taskController.getTaskController);
router.post("/", taskController.postTaskController);

export default router;
