import { prismaClient } from "@configs/db.config";
import { Task } from "@prisma/client";
import { RESPONSE_CODE } from "@utils/types/response.types";
import { Request, Response } from "express";
import { isEmpty, isNull, isString } from "lodash";

const getTask = async (req: Request, res: Response) => {
  const id = req.params?.id;
  if (!isString(id)) {
    return res.status(RESPONSE_CODE.BAD_REQUEST).json({
      message: "Invalid request. ID is not a string",
    });
  }

  try {
    const task: Task | null = await prismaClient.task.findFirst({
      where: { id },
    });

    if (!isNull(task)) {
      return res.status(RESPONSE_CODE.NO_CONTENT).send("Task not found");
    }
  } catch (error) {
    return res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .send("ERROR: Error occurred while finding task");
  }
};

export const taskController = {
  getTask,
};
