import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

export default function AppHeader() {

  return (
    <header className={styles.header}>
      <nav className={`${styles.navbar} pb-4 pt-4`}>
        <div className={styles.container}>
          <Button htmlType="button" type="secondary" size="large" extraClass={`text text_type_main-default ${styles.link} ${styles.link_active}`}>
            <BurgerIcon type="primary" />
            Конструктор
          </Button>
          <Button htmlType="button" type="secondary" size="large" extraClass={`text text_type_main-default text_color_inactive ${styles.link}`}>
            <ListIcon type="secondary" />
            Лента заказов
          </Button>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Button htmlType="button" type="secondary" size="large" extraClass={`text text_type_main-default text_color_inactive ${styles.link} ${styles.link_type_left}`}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </Button>
      </nav>
    </header>
  );
}