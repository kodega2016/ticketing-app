import { OrderCancelledEvent, Publisher, Subjects } from "@kodetickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = "orders-service";
}
