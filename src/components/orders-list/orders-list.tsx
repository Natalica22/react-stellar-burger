import { OrderCard } from "./order-card/order-card";
import styles from "./orders-list.module.css";
import { useLocation } from "react-router-dom";
import { Order } from "../../utils/types";

type Props = {
  orders: Order[];
  showStatus: boolean;
  basePage: string;
  className?: string;
}

export function OrdersList({ orders, showStatus, basePage, className }: Props) {
  const location = useLocation();

  return (
    <div className={`${styles.orders} pr-2 custom-scroll ${className}`}>
      {orders.map(e => <OrderCard key={e._id} order={e} showStatus={showStatus} basePage={basePage} location={location} />)}
    </div>
  )
}
