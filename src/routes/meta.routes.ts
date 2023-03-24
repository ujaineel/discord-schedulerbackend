import { Request, Response, Router } from "express";
import { routerConfig } from "@configs/app.config";
import { RESPONSE_CODE } from "@utils/types/ResponseCode";

const router = Router(routerConfig);

router.get("/", (req: Request, res: Response) => {
  res.status(RESPONSE_CODE.OK).send("ok");
});

router.get("/ping", (_, res: Response) => {
  res.send("pong");
});

export default router;
