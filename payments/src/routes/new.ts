import { requireAuth, validateRequest } from "@kodetickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("token is required"),
    body("orderId").not().isEmpty().withMessage("orderId is required"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    console.info("payment is created");
    res.status(201).send({
      data: [],
      message: "payment is created successfully",
      success: true,
    });
  }
);

export { router as createChargeRouter };
