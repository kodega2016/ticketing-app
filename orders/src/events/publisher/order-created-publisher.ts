import { OrderCreatedEvent, Publisher, Subjects } from "@kodetickets/common";
import { queueGroupName } from "../listener/queue-group-name";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
}
