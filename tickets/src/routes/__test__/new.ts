import { requireAuth, validateRequest } from "@kodetickets/common";
import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import { Ticket } from "../../models/ticket";
const router: Router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    await ticket.save();

    res.status(201).send({
      data: ticket,
      message: "ticket is created successfully",
      success: true,
    });
  }
);

export { router as createTicketRouter };
