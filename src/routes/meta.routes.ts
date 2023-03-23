import { Request, Response, Router } from "express";
import { routerConfig } from "@configs/app.config";

const router = Router(routerConfig);

router.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

router.get("/ping", (_, res: Response) => {
  res.send("pong");
});

export default router;
