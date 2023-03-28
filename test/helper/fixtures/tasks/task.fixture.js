const { faker } = require("@faker-js/faker");

// Storing one as default fixture, but creating this function just in case if needed.
export const createTaskFixture = () => {
  const createdAtDate = faker.date.recent(20, "2023-02-01T00:00:00.000Z");
  const updatedAtDate = faker.date.soon(2, createdAtDate);

  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.product(),
    content: faker.commerce.productDescription(),
    published: faker.datatype.boolean(),
    createdAt: createdAtDate,
    updatedAt: updatedAtDate,
    deletedAt: faker.date.soon(3, updatedAtDate),
    userId: faker.datatype.uuid(),
  };
};

/*
Commenting in case needed
if (!fs.existsSync("test/helper/fixtures/tasks/taskFixture.json")) {
  const taskFixture = createTaskFixture();
  fs.writeFileSync(
    "test/helper/fixtures/tasks/taskFixture.json",
    JSON.stringify(taskFixture)
  );
}
*/
