import prismaClient from "../../../src/configs/db.config";
import { createTaskFixture } from "../fixtures/tasks/task.fixture.js";
import taskFixture from "../fixtures/tasks/taskFixture.json";
import userFixture from "../fixtures/users/userFixture.json";
import { createLocalUser } from "@root/src/services/users.services";
import { createUserFixture } from "../fixtures/users/user.fixture";
import { isEmpty } from "lodash";

/* istanbul ignore file */
const main = async (): Promise<void> => {
  await prismaClient.task.deleteMany();
  await prismaClient.user.deleteMany();

  const task1 = await prismaClient.task.create({
    data: taskFixture,
  });

  const task2 = await prismaClient.task.create({
    data: {
      ...createTaskFixture(),
    },
  });

  let user1 = await createLocalUser({
    username: "testusername1",
    password: "password1",
  });
  if (isEmpty(user1)) {
    user1 = await prismaClient.user.create({
      data: {
        ...createUserFixture(),
        username: "testusername1",
        password: "password1",
      },
    });
  }

  const user2 = await prismaClient.user.create({
    data: userFixture,
  });

  console.log(
    `Created tasks: ${task1.title} (${task1.userId} user) and ${task2.title} (${task2.userId} user)`
  );

  console.log(`Created User: ${user1.username} and ${user2.username}`);
};

export default main;
