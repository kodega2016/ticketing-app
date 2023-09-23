import { NotFoundError, currentUser, errorHandler } from "@kodetickets/common";
import cookieSession from "cookie-session";
import express, { Application } from "express";
import "express-async-errors";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
const app: Application = express();

// set trust proxy to true for https
app.set("trust proxy", true);

// set body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup cookie session
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);

// setup current user middleware
app.use(currentUser);
// setup routes
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);

// setup error handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
