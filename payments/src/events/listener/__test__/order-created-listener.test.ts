import { OrderCreatedEvent, OrderStatus } from "@kodetickets/common";
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListenr } from "../order-created-listener";

const setup = async () => {
  const listener = new OrderCreatedListenr(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: "asdf",
    userId: "asdf",
    status: OrderStatus.Created,
    ticket: {
      id: "asdf",
      price: 10,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("replicates the order info", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const order = await Order.findById(data.id);
  expect(order!.price).toEqual(data.ticket.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});