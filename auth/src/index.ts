import express, { Application } from "express";
const app: Application = express();
// setup express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
