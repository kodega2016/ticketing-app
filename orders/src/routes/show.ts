import { Router } from "express";

const router = Router();

router.get("/api/orders/:id", async (req, res) => {
  res.status(201).send({
    data: {},
    message: "order is fetched successfully",
    success: true,
  });
});

export { router as showOrderRouter };
