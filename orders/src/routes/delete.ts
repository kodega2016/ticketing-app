import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@kodetickets/common";
import { Router } from "express";
import { Order } from "../models/order";

const router = Router();

router.delete("/api/orders/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  res.status(204).send({
    data: null,
    message: "order is deleted successfully",
    success: true,
  });
});

export { router as deleteOrderRouter };
