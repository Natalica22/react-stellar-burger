import { OrderStatus, OrderStatusCreated, OrderStatusDone, OrderStatusPending } from "./types";

export const STATUS_DONE: OrderStatusDone = 'done';
const STATUS_PENDING: OrderStatusPending = 'pending';
const STATUS_CREATED: OrderStatusCreated = 'created';

export const ORDER_STATUSES: OrderStatus[] = [STATUS_DONE, STATUS_PENDING, STATUS_CREATED];

export function getStatusText(status: OrderStatus) {
  switch (status) {
    case STATUS_DONE:
      return 'Выполнен';
    case STATUS_PENDING:
      return 'Готовится';
    case STATUS_CREATED:
      return 'Создан';
    default:
      return null;
  }
}
