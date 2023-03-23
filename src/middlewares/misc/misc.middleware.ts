import { Request, Response, NextFunction } from "express";
import { env } from "@configs/app.config";
import { RESPONSE_CODE } from "@utils/types/ResponseCode";

export const showApiDocs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env != "production") {
    next();
  } else {
    return res.status(RESPONSE_CODE.NOT_FOUND).send();
  }
};
