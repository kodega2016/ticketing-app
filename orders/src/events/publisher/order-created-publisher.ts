import { OrderCreatedEvent, Publisher, Subjects } from "@kodetickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = "orders-service";
}
