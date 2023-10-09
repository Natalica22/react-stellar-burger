import { OrdersList } from "../../components/orders-list/orders-list";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import styles from "./profile-orders-page.module.css";

export function ProfileOrdersPage() {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ProfileMenu />
        <div className={styles.orders}>
          <OrdersList />
        </div>
      </div>
    </main>
  )
}