import { useSelector } from "react-redux";
import styles from "./orders-status.module.css";
import { STATUS_DONE } from "../../utils/order";
import { useMemo } from "react";

export function OrdersStatus() {
  const getOrdersData = store => store.wsFeedOrders.data;
  const ordersData = useSelector(getOrdersData);

  const doneOrders = useMemo(() =>
    ordersData ? ordersData.orders.filter(e => e.status === STATUS_DONE).slice(0, 20) : [],
    [ordersData]);
  const cookingOrders = useMemo(() =>
    ordersData ? ordersData.orders.filter(e => e.status !== STATUS_DONE).slice(0, 20) : [],
    [ordersData]);

  return (
    ordersData &&
    <div className={styles.container}>
      <div className={styles.orders}>
        <div>
          <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
          <ul className={`${styles.orders_numbers} ${styles.done_orders}`}>
            {doneOrders.map(e => <li className="text text_type_digits-default">{e.number}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="text text_type_main-medium pb-6">В работе:</h3>
          <ul className={styles.orders_numbers}>
            {cookingOrders.map(e => <li className="text text_type_digits-default">{e.number}</li>)}
          </ul>
        </div>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${styles.number_glow}`}>{ordersData.total}</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${styles.number_glow}`}>{ordersData.totalToday}</p>
      </div>
    </div>
  );
}