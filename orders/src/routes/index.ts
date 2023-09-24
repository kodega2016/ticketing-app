import { requireAuth } from "@kodetickets/common";
import { Router } from "express";
import { Order } from "../models/order";

const router = Router();

router.get("/api/orders", requireAuth, async (req, res) => {
  const orders = await Order.find({ userId: req.currentUser!.id }).populate(
    "ticket"
  );
  res.status(200).send({
    data: orders,
    message: "orders are fetched successfully",
    success: true,
  });
});

export { router as indexOrderRouter };
