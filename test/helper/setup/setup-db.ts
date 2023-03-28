import prismaClient from "../../../src/configs/db.config";
import { createTaskFixture } from "../fixtures/tasks/task.fixture.mjs";
import taskFixture from "../fixtures/tasks/taskFixture.json";

const main = async (): Promise<void> => {
  await prismaClient.task.deleteMany();

  const task1 = await prismaClient.task.create({
    data: taskFixture,
  });

  const task2 = await prismaClient.task.create({
    data: {
      ...createTaskFixture(),
    },
  });

  console.log(
    `Created users: ${task1.title} (${task1.userId} user) and ${task2.title} (${task2.userId} user)`
  );
};

export default main;
