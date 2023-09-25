import { Listener, OrderCreatedEvent, Subjects } from "@kodetickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    // find the ticket that the order is reserving
    const { id, ticket } = data;
    const fetchedTicket = await Ticket.findById(ticket.id);
    // if no ticket, throw error
    if (!fetchedTicket) {
      throw new Error("Ticket not found");
    }
    // mark the ticket as being reserved by setting its orderId property
    fetchedTicket.set({ orderId: id });
    await fetchedTicket.save();
    // ack the message
    msg.ack();
    console.log("event processed: order created");
  }
}
