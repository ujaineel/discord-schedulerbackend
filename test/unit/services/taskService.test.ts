import { prismaMock } from "../../helper/singleton";
import taskFixture from "../../helper/fixtures/tasks/taskFixture.json";
import { getTask } from "@root/src/services/tasks.services";
import { type Task } from "@prisma/client";
import { correctDateValues } from "@utils/helper/misc.helper";

describe("Task Service", () => {
  describe("getTask", () => {
    const id: string = "test-id";

    const testTask: Task = correctDateValues({
      ...taskFixture,
      deletedAt: null,
    });

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

    it("should throw an error if someething happens", async () => {
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
});
