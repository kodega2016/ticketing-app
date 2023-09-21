import { Listener, Subjects, TicketCreatedEvent } from "@kodetickets/common";
import { Message } from "node-nats-streaming";


export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName: string = "payments-service";
  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data!", data);
    console.log(data.title);
    msg.ack();
  }
}
