import { Publisher, Subjects, TicketCreatedEvent } from "@kodetickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject= Subjects.TicketCreated;
  queueGroupName = 'payments-service';
}
