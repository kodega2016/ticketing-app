import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

console.clear();

const clientId = randomBytes(4).toString("hex");
const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("⚡️ listener connected to NATS ⚡️");

  const subOptions = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable();

  const subscription = stan.subscribe("ticket:created", subOptions);
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    stan.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    // Acknowledge the message
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
