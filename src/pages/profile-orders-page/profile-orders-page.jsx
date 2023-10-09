import { OrdersList } from "../../components/orders-list/orders-list";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import styles from "./profile-orders-page.module.css";
import { orders } from "../../utils/constants";
import { PROFILE_ORDERS_PAGE } from "../../utils/pages";

export function ProfileOrdersPage() {

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