import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
console.clear();

const clientId = randomBytes(4).toString("hex");
const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", async() => {
  console.log("⚡️ Publisher connected to NATS ⚡️");
  const data = {
    id: "123",
    title: "concert",
    price: 20,
    userId: "123",
  };
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish(data);
  } catch (error) {
    console.error(error);
  }
});
