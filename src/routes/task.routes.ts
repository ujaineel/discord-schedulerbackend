import taskController from "@controllers/tasks.controllers";
import { authenticationMiddleware } from "@middlewares/auth/auth.middleware";
import { isUserOfTask } from "@middlewares/user/user.middlewares";
import { Router } from "express";

const router: Router = Router();

router.get("/:id", isUserOfTask, taskController.getTaskController);
router.post("/", authenticationMiddleware, taskController.postTaskController);
router.patch("/:id", isUserOfTask, taskController.patchTaskController);
router.delete("/:id", isUserOfTask, taskController.deleteTaskController);

export default router;
