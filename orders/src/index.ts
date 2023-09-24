import { BadRequestError } from "@kodetickets/common/build/errors/bad-request-error";
import mongoose from "mongoose";
import { app } from "./app";
import { TicketCreatedListener } from "./events/listener/ticket-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new BadRequestError("MONGO_URI must be defined");
  }

  if (!process.env.JWT_KEY) {
    throw new BadRequestError("JWT_KEY must be defined");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new BadRequestError("NATS_CLIENT_ID must be defined");
  }

  if (!process.env.NATS_URL) {
    throw new BadRequestError("NATS_URL must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new BadRequestError("NATS_CLUSTER_ID must be defined");
  }

  try {
    // setup nats connection and handle close events
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    console.log("[🔌] Connected to NATS");

    new TicketCreatedListener(natsWrapper.client).listen();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  // setup mongodb connection
  await mongoose.connect(process.env.MONGO_URI);
  console.log("[🗄] Connected to MongoDB");

  const PORT = 3000;
  const server = app.listen(PORT, () => {
    console.log(`[🚀] Server running on port ${PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });
};

start();
