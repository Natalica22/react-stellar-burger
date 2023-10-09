import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import * as pages from "../../utils/pages"
import { Link, NavLink } from "react-router-dom";

function getLinkClass({ isActive }) {
  return `${styles.link} text text_type_main-default pt-4 pb-4 pl-5 pr-5 ` + (isActive ? styles.link_active : 'text_color_inactive');
}

function getIconType(isActive) {
  return isActive ? 'primary' : 'secondary';
}

export default function AppHeader() {

  return (
    <header className={styles.header}>
      <nav className={`${styles.navbar} pb-4 pt-4`}>
        <div className={styles.container}>
          <NavLink
            end
            to={pages.HOME_PAGE}
            className={getLinkClass}>
            {({ isActive }) =>
              <>
                <BurgerIcon type={getIconType(isActive)} />
                Конструктор
              </>
            }
          </NavLink>
          <NavLink
            end
            to={pages.ORDERS_FEED_PAGE}
            className={getLinkClass}>
            {({ isActive }) =>
              <>
                <ListIcon type={getIconType(isActive)} />
                Лента заказов
              </>
            }
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Link to={pages.HOME_PAGE}>
            <Logo />
          </Link>
        </div>
        <NavLink
          to={pages.PROFILE_PAGE}
          className={(state) => `${getLinkClass(state)} ${styles.link_type_right}`}>
          {({ isActive }) =>
            <>
              <ProfileIcon type={getIconType(isActive)} />
              Личный кабинет
            </>
          }
        </NavLink>
      </nav>
    </header>
  );
}