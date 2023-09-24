import request from "supertest";
import { app } from "../../app";

it("can fetch a list of orders", async () => {
  await request(app)
    .get("/api/orders")
    .set("Cookie", global.signin())
    .send()
    .expect(200);
});
