import { Request, Response, Router } from "express";
import { routerConfig } from "@configs/app.config";

const router = Router(routerConfig);

router.get("/", (req: Request, res: Response) => {
    res.send("ok");
});

export default router;