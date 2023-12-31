import cookieSession from "cookie-session";
import express, { Application } from "express";
import "express-async-errors";
const app: Application = express();
// set trust proxy to true for https
app.set("trust proxy", true);

// set body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup cookie session
app.use(
  cookieSession({
    // this needs to be true for https
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);

import { NotFoundError, currentUser, errorHandler } from "@kodetickets/common";
import { indexTicketRouter } from "./routes";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { updateTicketRouter } from "./routes/update";

// setup routes
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
// setup error handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
