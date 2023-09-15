import express, { Application } from 'express'
import cookieSession from "cookie-session";
const app:Application = express()
// set trust proxy to true for https
app.set("trust proxy", true);

// set body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// setup cookie session
app.use(
  cookieSession({
    // this needs to be true for https
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);

import { NotFoundError,errorHandler,currentUser } from "@kodetickets/common";
import { createTicketRouter } from './routes/__test__/new';

// setup routes
app.use(currentUser)
app.use(createTicketRouter)

// setup error handler
app.get("*", async (req, res) => {
  console.log('req.currentUser', req.currentUser);
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };