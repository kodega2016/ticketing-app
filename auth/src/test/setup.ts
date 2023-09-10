import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: any;
beforeAll(async () => {
  // set env variables
  process.env.JWT_KEY = "secret";
  // setup in-memory mongodb server
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  // reset all mocks data before each test
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // close mongoose connection after all tests
  mongo.stop();
  await mongoose.connection.close();
});
