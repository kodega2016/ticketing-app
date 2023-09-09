import cookieSession from "cookie-session";
import express, { Application } from "express";
import "express-async-errors";
import mongoose from "mongoose";

const app: Application = express();

// set trust proxy to true for https
app.set("trust proxy", true);
// setup express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup cookie session
app.use(
  cookieSession({
    // this needs to be true for https
    secure: true,
    signed: false,
  })
);

// setup routes
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// setup error handler
app.get("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
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
