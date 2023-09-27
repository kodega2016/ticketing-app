import { Listener, OrderCancelledEvent, Subjects } from "@kodetickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    msg.ack();
    console.log("Event processed", "order-cancelled");
  }
}
