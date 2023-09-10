import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect(
      "mongodb://auth-mongo-cluster-ip-service:27017/auth"
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
