import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

export default function AppHeader() {

  return (
    <header className={styles.header}>
      <nav className={`${styles.navbar} pb-4 pt-4`}>
        <div className={styles.container}>
          <a className={styles.link}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default pl-2">Конструктор</p>
          </a>
          <a className={styles.link}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a className={`${styles.link} ${styles.link_type_left}`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}