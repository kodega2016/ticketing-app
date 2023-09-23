import { requireAuth } from "@kodetickets/common";
import { Router } from "express";

const router = Router();

router.post("/api/orders", requireAuth, async (req, res) => {
  res.status(200).send({
    data: {},
    message: "order is created successfully",
    success: true,
  });
});

export { router as newOrderRouter };
