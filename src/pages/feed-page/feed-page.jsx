import { OrdersList } from "../../components/orders-list/orders-list";
import styles from "./feed-page.module.css";
import { orders } from "../../utils/constants";
import { OrdersStatus } from "../../components/orders-status/orders-status";
import { FEED_ORDER_INFO_PAGE, FEED_PAGE } from "../../utils/pages";

export function FeedPage() {

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