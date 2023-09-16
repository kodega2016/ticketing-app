import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

console.clear();

const clientId = randomBytes(4).toString("hex");
const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("⚡️ listener connected to NATS ⚡️");

  const subscription = stan.subscribe("ticket:created");
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
  });
});
