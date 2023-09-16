import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
console.clear();

const clientId = randomBytes(4).toString("hex");
const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("⚡️ Publisher connected to NATS ⚡️");

  const data = {
    id: "123",
    title: "concert",
    price: 20,
  };

  const dataString = JSON.stringify(data);
  stan.publish("ticket:created", dataString, () => {
    console.log("Event published");
  });
});
