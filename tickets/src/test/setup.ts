import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let mongo: any;
beforeAll(async () => {
  // set env variables
  process.env.JWT_KEY = "secret";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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

declare global {
  // var signin: () => Promise<string[]>;
  var signin:()=>string[];
}

global.signin = () => {
  // build a jwt payload {id,email}
  const payload={
    id:'1234',
    email:"test@test.com",
  };
  
  // create jwt
  const token=jwt.sign(payload,process.env.JWT_KEY!);

  // build session object {jwt:MY_JWT}
  const session= {jwt:token};

  // turn session into json
  const sessionJSON=JSON.stringify(session);

  // encode json as base64
  const base64=Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data  
  return [`session=${base64}`];
};
