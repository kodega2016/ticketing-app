import {
  BadRequestError,
  NotAuthorizedError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@kodetickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";
const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("token is required"),
    body("orderId").not().isEmpty().withMessage("orderId is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }

    console.log({
      currency: "usd",
      amount: order.price * 100,
      source: token,
      description: "Ticketing app",
    });

    await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
      description: "Ticketing app",
    });

    res.status(201).send({
      data: [],
      message: "payment is created successfully",
      success: true,
    });
  }
);

export { router as createChargeRouter };
