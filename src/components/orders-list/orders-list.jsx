import PropTypes from "prop-types";
import { OrderCard } from "./order-card/order-card";
import styles from "./orders-list.module.css";
import { useLocation } from "react-router-dom";
import { orderPropType } from "../../utils/prop-types";

export function OrdersList({ orders, showStatus, basePage, className }) {
  const location = useLocation();

  return (
    <div className={`${styles.orders} pr-2 custom-scroll ${className}`}>
      {orders.map(e => <OrderCard key={e._id} order={e} showStatus={showStatus} basePage={basePage} location={location} />)}
    </div>
  )
}

OrdersList.prototype = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
  showStatus: PropTypes.bool,
  basePage: PropTypes.string.isRequired,
  className: PropTypes.string
}
