import { requireAuth } from "@kodetickets/common";
import { Router } from "express";

const router = Router();

router.delete("/api/orders/:id", requireAuth, async (req, res) => {
  res.status(200).send({
    data: null,
    message: "order is deleted successfully",
    success: true,
  });
});

export { router as deleteOrderRouter };
