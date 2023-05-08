import { RESPONSE_CODE } from "@utils/types/response.types";
import { type NextFunction, type Request, type Response } from "express";

export const isUserOfTask = async (
  req: Request,
  res: Response,
  nextFn: NextFunction
): Promise<any> => {
  if (req?.user !== undefined || req?.user !== null) {
    nextFn();
  } else {
    res
      .status(RESPONSE_CODE.BAD_REQUEST)
      .json({ message: "Bad Request For Task Fetching" });
  }
};
