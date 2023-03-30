import { prismaMock } from "../../helper/singleton";
import taskFixture from "../../helper/fixtures/tasks/taskFixture.json";
import {
  getTask,
  patchTask,
  postTask,
} from "@root/src/services/tasks.services";
import { type Task } from "@prisma/client";
import { correctDateValues } from "@utils/helper/misc.helper";
import prismaClient from "@configs/db.config";
import { type PatchTaskDto, type CreateTaskDto } from "@utils/dtos/tasks.dtos";

describe("Task Service", () => {
  afterAll(async () => {
    await prismaMock.$disconnect();
    await prismaClient.$disconnect();
  });
  describe("getTask", () => {
    const id: string = "test-id";

    const testTask = correctDateValues({
      ...taskFixture,
      deletedAt: null,
    }) as unknown as Task;

    it("should return task if found", async () => {
      prismaMock.task.findFirst.mockResolvedValue(testTask);

      const task = await getTask(id);
      expect(task).toEqual(testTask);
    });

    it("should return null if no task found", async () => {
      prismaMock.task.findFirst.mockResolvedValue(null);

      const task = await getTask(id);
      expect(task).toEqual(null);
    });

    it("should throw an error if something happens", async () => {
      prismaMock.task.findFirst.mockRejectedValue(null);

      let error;
      let task;
      try {
        task = await getTask(id);
      } catch (err: any) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(task).toBeUndefined();
    });
  });

  describe("postTask", () => {
    const createTaskDto: CreateTaskDto = {
      title: "Test Title #1",
      userId: "sfdsf",
    };

    it.failing("throw an error if an issue occurs", async () => {
      prismaMock.task.create.mockRejectedValue(
        new Error("Something went wrong")
      );

      const task = await postTask(createTaskDto);

      return task;
    });
  });

  describe("patchTask", () => {
    const patchTaskDto: PatchTaskDto = {
      title: "Update Test Title #1",
      published: true,
    };

    const id: string = "test-id";

    it.failing("throw an error if an issue occurs", async () => {
      prismaMock.task.update.mockRejectedValue(
        new Error("Something went wrong while patching task")
      );

      const task = await patchTask({ id, patchTaskDto });

      return task;
    });
  });
});
