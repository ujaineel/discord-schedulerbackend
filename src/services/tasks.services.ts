import prismaClient from "@configs/db.config";
import { type Task } from "@prisma/client";
import { type CreateTaskDto } from "@utils/dtos/tasks.dtos";
import { isEmpty } from "lodash";

const getTask = async (id: string): Promise<Task | null> => {
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
    console.log(JSON.stringify(error), error?.message, error?.stack);
    throw new Error(error);
  }
};

const postTask = async (createTaskDto: CreateTaskDto): Promise<Task | null> => {
  try {
    const task: Task = await prismaClient.task.create({ data: createTaskDto });

    if (isEmpty(task)) {
      return null;
    }

    return task;
  } catch (error: any) {
    console.log(JSON.stringify(error), error?.message, error?.stack);
    throw new Error(error);
  }
};

export { getTask, postTask };
