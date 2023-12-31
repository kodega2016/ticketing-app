import { currentUser, errorHandler } from "@kodetickets/common";
import cookieSession from "cookie-session";
import express, { Application } from "express";
import "express-async-errors";
import { createChargeRouter } from "./routes/new";
const app: Application = express();

// set trust proxy to true for https
app.set("trust proxy", true);

// set body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set cookie session
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(createChargeRouter);

app.use(errorHandler);
app.get("*", async (req, res) => {
  throw new Error("Route not found");
});

export { app };
