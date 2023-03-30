import prismaClient from "@configs/db.config";
import { type Task } from "@prisma/client";
import { type CreateTaskDto, type PatchTaskDto } from "@utils/dtos/tasks.dtos";
import { isEmpty } from "lodash";

const getTask = async (id: string): Promise<Task | null> => {
  try {
    const task: Task | null = await prismaClient.task.findFirst({
      where: { id },
    });

    if (isEmpty(task)) {
      return null;
    }

    return task;
  } catch (error: any) {
    console.log(JSON.stringify(error), error?.message, error?.stack);
    throw new Error(error);
  }
};

const postTask = async (createTaskDto: CreateTaskDto): Promise<Task> => {
  try {
    const task: Task = await prismaClient.task.create({ data: createTaskDto });

    return task;
  } catch (error: any) {
    console.log(JSON.stringify(error), error?.message, error?.stack);
    throw new Error(error);
  }
};

const patchTask = async ({
  id,
  patchTaskDto,
}: {
  id: string;
  patchTaskDto: PatchTaskDto;
}): Promise<Task> => {
  try {
    const task = await prismaClient.task.update({
      where: { id },
      data: { ...patchTaskDto },
    });

    return task;
  } catch (error: any) {
    console.log(JSON.stringify(error), error?.message, error?.stack);
    throw new Error(error);
  }
};

const deleteTask = async (id: string): Promise<Task> => {
  try {
    const task = await prismaClient.task.delete({ where: { id } });

    return task;
  } catch (error: any) {
    console.log(JSON.stringify(error), error?.message, error?.stack);
    throw new Error(error);
  }
};

export { getTask, postTask, patchTask, deleteTask };
