import { OrderCancelledEvent, Publisher, Subjects } from "@kodetickets/common";
import { queueGroupName } from "../listener/queue-group-name";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
}
