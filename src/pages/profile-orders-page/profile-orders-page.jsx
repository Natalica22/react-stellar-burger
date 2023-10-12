import { OrdersList } from "../../components/orders-list/orders-list";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import styles from "./profile-orders-page.module.css";
import { PROFILE_ORDERS_PAGE } from "../../utils/pages";
import { connectProfileOrders, disconnect } from "../../services/actions/wsFeedOrders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

export function ProfileOrdersPage() {
  const dispatch = useDispatch();

  const getOrdersData = store => store.wsFeedOrders.data;
  const ordersData = useSelector(getOrdersData);

  const orders = useMemo(() =>
    ordersData?.orders.toReversed() || [],
    [ordersData]);

  useEffect(() => {
    dispatch(connectProfileOrders());
    return () => dispatch(disconnect());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.orders}>
          <OrdersList orders={orders} showStatus={true} className={styles.list} basePage={PROFILE_ORDERS_PAGE} />
        </div>
      </div>
    </main>
  )
}