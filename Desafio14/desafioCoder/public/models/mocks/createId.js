//import { faker } from "@faker-js/faker";
const { faker } = require("@faker-js/faker");

async function createId() {
  const id = faker.database.mongodbObjectId();

  return id;
}

module.exports = createId;
