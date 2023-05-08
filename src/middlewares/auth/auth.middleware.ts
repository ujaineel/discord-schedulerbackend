import { RESPONSE_CODE } from "@utils/types/response.types";
import { type NextFunction, type Request, type Response } from "express";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.status(RESPONSE_CODE.FORBIDDEN).json({ message: "Forbidden Endpoint" });
};

export { authenticationMiddleware };
