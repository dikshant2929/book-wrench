const database = require("./index");

describe("Database", function () {
  beforeAll(async () => {
    await database.connect(process.env.DB_URL);
  });

  afterAll(async () => {
    await database.truncate();
    await database.disconnect();
  });

  test("should have success connection", function () {
    expect(database.getDb().s.client.topology.isConnected()).toBeTruthy();
  });

  test("should allow us to create collection", async function () {
    const collectionName = "sampleCollection";
    const db = database.getDb();
    await db.createCollection(collectionName);
    const isExists = (await (await db.listCollections().toArray()).findIndex((item) => item.name === collectionName)) !== -1;
    expect(isExists).toBeTruthy();
  });

  test("should allow us to remove created collection", async function () {
    const collectionName = "sampleCollection";
    const db = database.getDb();
    try {
      await db.createCollection(collectionName);
    } catch (error) {
      console.log(error);
    }
    const collection = await database.getCollection(collectionName);
    await collection.drop();
    const isExists = (await (await db.listCollections().toArray()).findIndex((item) => item.name === collectionName)) !== -1;
    expect(isExists).toBeFalsy();
  });

  test("should throw error when not passing DB Name", async function () {
    try {
      await database.getCollection();
    } catch (error) {
      expect(error.name).toBe("CustomError");
    }
  });
});
