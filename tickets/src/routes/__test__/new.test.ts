import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {

  const response = await request(app)
  .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(404);
});


it("returns an error if an invalid title is provided", async () => {
  await request(app)
  .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

    await request(app)
    .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        price: 10,
      })
      .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
  .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: -10,
    })
    .expect(400);

    await request(app)
    .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title: "title",
      })
      .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  // add in a check to make sure a ticket was saved
  // let tickets = await request(app)
  // .get("/api/tickets")
  //   .set("Cookie", global.signin())
  //   .send({});

  // expect(tickets.body.data.length).toEqual(0);

  await request(app)
  .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 10,
    })
    .expect(201);

    // tickets = await request(app)
    // .get("/api/tickets")
    //   .set("Cookie", global.signin())
    //   .send({});

    // expect(tickets.body.data.length).toEqual(1);
});
