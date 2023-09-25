import { TicketCreatedEvent } from "@kodetickets/common";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedListener } from "../ticket-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const userID = new mongoose.Types.ObjectId().toHexString();
  // create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // create a fake data event
  const data: TicketCreatedEvent["data"] = {
    id: id,
    version: 0,
    title: "concert",
    price: 20,
    userId: userID,
  };
  // create a fake message object
  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, data, message };
};

it("creates and saves a ticket", async () => {
  const { listener, data, message } = await setup();
  await listener.onMessage(data, message);
  // write assertions to make sure a ticket was created!
  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
  expect(ticket?.title).toEqual(data.title);
  expect(ticket?.price).toEqual(data.price);
});
it("acks the message", async () => {
  const { listener, data, message } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, message);
  // write assertions to make sure ack function is called
  expect(message.ack).toHaveBeenCalled();
});
