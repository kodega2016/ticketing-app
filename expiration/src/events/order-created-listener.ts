import { Listener, OrderCreatedEvent, Subjects } from "@kodetickets/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    await expirationQueue.add(
      { orderId: data.id },
      {
        delay: 10000,
      }
    );
    msg.ack();
  }
}
