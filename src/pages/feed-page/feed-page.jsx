import { OrdersList } from "../../components/orders-list/orders-list";
import styles from "./feed-page.module.css";
import { FEED_WS_URL } from "../../utils/constants";
import { OrdersStatus } from "../../components/orders-status/orders-status";
import { FEED_PAGE } from "../../utils/pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FEED_WS_CLOSE, FEED_WS_CONNECT } from "../../services/actions/wsFeedOrders";

export function FeedPage() {
  const dispatch = useDispatch();

  const getOrdersData = store => store.wsFeedOrders.data;
  const ordersData = useSelector(getOrdersData);

  const orders = ordersData ? ordersData.orders : [];

  useEffect(() => {
    dispatch({ type: FEED_WS_CONNECT, payload: FEED_WS_URL });
    return () => dispatch({ type: FEED_WS_CLOSE });
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className="text text_type_main-large pt-10 pl-1">Лента заказов</h2>
        <div className={styles.orders}>
          <OrdersList className={`${styles.list} pl-1`} orders={orders} showStatus={false} basePage={FEED_PAGE} />
          <OrdersStatus />
        </div>
      </div>
    </main>
  )
}