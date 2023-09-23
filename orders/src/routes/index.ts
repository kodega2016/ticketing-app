import { Router } from "express";

const router = Router();

router.get("/api/orders", async (req, res) => {
  res.status(200).send({
    data: [],
    message: "orders are fetched successfully",
    success: true,
  });
});

export { router as indexOrderRouter };
