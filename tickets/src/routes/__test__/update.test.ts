import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("return a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "flutter and firebase for mobile app development",
      price: 100,
    })
    .expect(404);
});

it("return a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "flutter and firebase for mobile app development",
      price: 100,
    })
    .expect(401);
});

it("return a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "flutter and firebase for mobile app development",
      price: 100,
    });

  await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "flutter and firebase for mobile app development",
      price: 100,
    })
    .expect(401);
});

it("return a 400 if the user provides an invalid title or price", async () => {
  // create a ticket
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "flutter and firebase for mobile app development",
      price: 100,
    });

  // update the ticket
  await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 100,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  // create a ticket
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "flutter and firebase for mobile app development",
      price: 100,
    });

  // update the ticket
  const title = "flutter and firebase for mobile app development";
  const price = 200;
  const updateResponse = await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    })
    .expect(200);

  expect(updateResponse.body.data.title).toEqual(title);
  expect(updateResponse.body.data.price).toEqual(price);
});

it("publishes an event", async () => {
  // create a ticket
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "flutter and firebase for mobile app development",
      price: 100,
    });

  // update the ticket
  const title = "flutter and firebase for mobile app development";
  const price = 200;
  await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if the ticket is reserved", async () => {
  // create a ticket
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "flutter and firebase for mobile app development",
      price: 100,
    });

  const ticket = await Ticket.findById(response.body.data.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  // update the ticket
  const title = "flutter and firebase for mobile app development";
  const price = 200;
  await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    })
    .expect(400);
});
