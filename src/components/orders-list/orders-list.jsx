import { OrderCard } from "./order-card/order-card";
import styles from "./orders-list.module.css";
import { orders } from "../../utils/constants";

export function OrdersList({ orders, showStatus, className }) {

  return (
    <div className={`${styles.orders} pr-2 custom-scroll ${className}`}>
      {orders.map(e => <OrderCard key={e._id} order={e} showStatus={showStatus}/>)}
    </div>
  )
}


