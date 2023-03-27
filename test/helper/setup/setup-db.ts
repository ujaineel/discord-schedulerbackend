import prismaClient from "../../../src/configs/db.config";
import { createTaskFixture } from "../fixtures/tasks/task.fixture.mjs";

const main = async (): Promise<void> => {
  await prismaClient.task.deleteMany();

  const task1 = await prismaClient.task.create({
    data: {
      id: "3142fa93-b2c2-4562-a35b-579d683524d4",
      title: "Chips",
      content:
        "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
      published: false,
      createdAt: "2023-01-22T13:09:31.161Z",
      updatedAt: "2023-01-23T16:39:35.002Z",
      deletedAt: null,
      userId: "bba9df91-1f82-478c-8fc2-3bdd8d3dc266",
    },
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
