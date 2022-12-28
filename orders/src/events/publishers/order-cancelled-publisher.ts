import { Publisher, OrderCancelledEvent, Subjects } from '@ysg-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}