import styles from "./profile-page.module.css";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import { Outlet } from "react-router-dom";


export function ProfilePage() {
   return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ProfileMenu />
        <Outlet />
      </div>
    </main>
  )
}