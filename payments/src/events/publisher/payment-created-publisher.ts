import { PaymentCreatedEvent, Publisher, Subjects } from "@kodetickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
