import { type Request, type Response, type NextFunction } from "express";
import { env } from "@configs/app.config";
import { RESPONSE_CODE } from "@utils/types/response.types";
import { ENV } from "@utils/types/app.types";

export const showApiDocs = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (env !== ENV.PRODUCTION) {
    next();
  } else {
    return res.status(RESPONSE_CODE.NOT_FOUND).send();
  }
};
