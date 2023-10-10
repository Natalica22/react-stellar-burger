
export const STATUS_DONE = 'done';
const STATUS_PENDING = 'pending';
const STATUS_CREATED = 'created';

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
