import { getTask } from "@controllers/tasks.controller";
import { Router } from "express";

const router: Router = Router();

router.get("/:id", getTask);

export default router;
