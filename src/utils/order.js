export const STATUS_DONE = 'done';
const STATUS_PENDING = 'pending';
const STATUS_CREATED = 'created';

export const ORDER_STATUSES = [STATUS_DONE, STATUS_PENDING, STATUS_CREATED];

export function getStatusText(status) {
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
