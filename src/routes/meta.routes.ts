import { type Request, type Response, Router } from "express";
import { routerConfig } from "@configs/app.config";
import { RESPONSE_CODE } from "@utils/types/response.types";

const router = Router(routerConfig);

router.get("/", (req: Request, res: Response) => {
  res.status(RESPONSE_CODE.OK).send("ok");
});

export default router;
