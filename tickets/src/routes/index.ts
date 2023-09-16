import { Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";

const router = Router();

router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});
  res.status(200).send({
    data: tickets,
    message: "tickets are fetched successfully",
    success: true,
  });
});

export { router as indexTicketRouter };
