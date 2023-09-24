import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("can fetch an order", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.data.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.data.id).toEqual(order.data.id);
});

it("returns an error if one user tries to fetch another user's order", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.data.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
