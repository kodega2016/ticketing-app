import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@kodetickets/common";
import { Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";
const router = Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const { title, price } = req.body;
    ticket.set({ title, price });
    await ticket.save();

    res.status(200).send({
      data: ticket,
      message: "ticket is updated successfully",
      success: true,
    });
  }
);

export { router as updateTicketRouter };
