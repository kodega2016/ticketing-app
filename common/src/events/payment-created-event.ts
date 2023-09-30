import { Subjects } from "./subjects";

export interface PaymentCreatedEvent {
  readonly subject: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
