import { prismaClient } from "@configs/db.config";
import { type Task } from "@prisma/client";
import { RESPONSE_CODE } from "@utils/types/response.types";
import { type Request, type Response } from "express";
import { isEmpty } from "lodash";

const getTask = async (req: Request, res: Response): Promise<void> => {
  const id = req.params?.id;
  if (isEmpty(id)) {
    res
      .status(RESPONSE_CODE.BAD_REQUEST)
      .json("Invalid request. Provide proper id");
    return;
  }

  try {
    const task: Task | null = await prismaClient.task.findFirst({
      where: { id },
    });

    if (isEmpty(task)) {
      res.status(RESPONSE_CODE.NO_CONTENT);
      return;
    }

    res.status(RESPONSE_CODE.OK).json(task);
  } catch (error) {
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json("ERROR: Error occurred while finding task");
  }
};

export { getTask };
