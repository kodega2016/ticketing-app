import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@kodetickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
