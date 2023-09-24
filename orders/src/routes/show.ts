import { NotAuthorizedError, NotFoundError } from "@kodetickets/common";
import { Router } from "express";
import { Order } from "../models/order";
const router = Router();

router.get("/api/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("ticket");
  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  res.status(200).send({
    data: order,
    message: "order is fetched successfully",
    success: true,
  });
});

export { router as showOrderRouter };
