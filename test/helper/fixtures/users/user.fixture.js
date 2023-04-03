const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

/* istanbul ignore file */
// Storing one as default fixture, but creating this function just in case if needed.
const createUserFixture = (body) => {
  const createdAtDate = faker.date.recent(20, "2023-02-01T00:00:00.000Z");
  const updatedAtDate = faker.date.soon(2, createdAtDate);
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(faker.internet.password(), salt);

  return {
    id: body.id || faker.datatype.uuid(),
    email: body.email || faker.internet.email(),
    username: body.username || faker.internet.userName(),
    password: body.userName || password,
    createdAt: body.createdAt || createdAtDate,
    updatedAt: body.updatedAt || updatedAtDate,
    deletedAt: body.deletedAt || faker.date.soon(3, updatedAtDate),
    //    userId: faker.datatype.uuid(),
  };
};

module.exports = { createUserFixture };

//Commenting in case needed
/*
if (!fs.existsSync("test/helper/fixtures/users/userFixture.json")) {
  const userFixture = createUserFixture();
  fs.writeFileSync(
    "test/helper/fixtures/users/userFixture.json",
    JSON.stringify(userFixture)
  );
}
*/
