import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  const title = "flutter and firebase for mobile app development";
  const price = 100;
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title,
    price,
  });
};

it("can fetch a list of tickets", async () => {
  // create three tickets
  await createTicket();
  await createTicket();
  await createTicket();
  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.data.length).toEqual(3);
});
