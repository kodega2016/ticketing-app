import { NotFoundError } from "@kodetickets/common";
import express, { Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";
const router: Router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).send({
    data: ticket,
    message: "ticket is fetched successfully",
    success: true,
  });
});

export { router as showTicketRouter };
