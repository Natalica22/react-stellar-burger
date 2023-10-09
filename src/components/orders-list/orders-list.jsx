import { orders } from "../../utils/constants";
import { OrderCard } from "./order-card/order-card";
import styles from "./orders-list.module.css";



export function OrdersList() {

  return (
    <div className={`${styles.orders} pr-2 custom-scroll`}>
      {orders.map(e => <OrderCard key={e._id} order={e} />)}
    </div>
  )
}


