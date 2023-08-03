import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderLink from "./header-link/header-link";

export default function AppHeader() {

  return (
    <header className={styles.header}>
      <nav className={`${styles.navbar} pb-4 pt-4`}>
        <div className={styles.container}>
          <HeaderLink extraClass={styles.link_active}>
            <BurgerIcon type="primary" />
            Конструктор
          </HeaderLink>
          <HeaderLink extraClass="text_color_inactive">
            <ListIcon type="secondary" />
            Лента заказов
          </HeaderLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <HeaderLink extraClass={`text_color_inactive ${styles.link_type_left}`}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </HeaderLink>
      </nav>
    </header>
  );
}