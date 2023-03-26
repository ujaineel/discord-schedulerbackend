import prismaClient from "@configs/db.config";
import { type Task } from "@prisma/client";
import { isEmpty } from "lodash";

export const getTask = async (id: string): Promise<Task | null> => {
  try {
    const task: Task | null = await prismaClient.task.findFirst({
      where: { id },
    });

    if (isEmpty(task)) {
      // #swagger.responses[204] = { description: 'No Task Found.' }
      return null;
    }

    return task;
  } catch (error: any) {
    // #swagger.responses[500] = { description: 'Internal Server Error' }
    console.log(error?.message, error?.stack);
    throw new Error(error.message);
  }
};
