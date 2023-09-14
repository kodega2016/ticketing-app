import { BadRequestError } from "@kodetickets/common";
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new BadRequestError("JWT_KEY must be defined");
  }

  if(!process.env.MONGO_URI){
    throw new BadRequestError("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(
      process.env.MONGO_URI!,
    );
    console.log("[🗄] Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }

  const PORT: number = 3000;
  const server = app.listen(PORT, () => {
    console.log(`[🚀] Server running on port ${PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });
};

// start server
start();
