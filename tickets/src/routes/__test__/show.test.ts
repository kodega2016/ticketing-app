import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the ticket is not found", async () => {
  const response = await request(app)
    .get("/api/tickets/507f191e810c19729de860ea")
    .send();
  expect(response.status).toEqual(404);
});

it("returns the ticket if the ticket is found", async () => {
  // create a ticket
  const title = "flutter and firebase for mobile app development";
  const price = 100;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    });

  // fetch the ticket
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.data.id}`)
    .send();

  expect(ticketResponse.status).toEqual(200);
  expect(ticketResponse.body.data.title).toEqual(title);
  expect(ticketResponse.body.data.price).toEqual(price);
});
