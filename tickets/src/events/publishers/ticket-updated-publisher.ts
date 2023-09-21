import { Publisher, Subjects, TicketUpdatedEvent } from "@kodetickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject= Subjects.TicketUpdated;
  queueGroupName = 'payments-service';
}
