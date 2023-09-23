import { requireAuth, validateRequest } from "@kodetickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";

const router = Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ticketId is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.status(200).send({
      data: {},
      message: "order is created successfully",
      success: true,
    });
  }
);

export { router as newOrderRouter };
