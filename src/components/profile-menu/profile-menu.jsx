import { Link, NavLink } from "react-router-dom";
import styles from "./profile-menu.module.css";
import { useDispatch } from "react-redux";
import { ACCESS_TOKEN, REFRESH_TOKEN, api } from "../../utils/api";
import { setUser } from "../../services/actions/user";
import * as pages from "../../utils/pages"

function getLinkClass({ isActive }) {
  return `${styles.link} text text_type_main-medium ` + (isActive ? styles.active_link : 'text_color_inactive');
}

export function ProfileMenu() {
  const dispatch = useDispatch();

  const logout = () => {
    api.logout()
      .then(() => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);

        dispatch(setUser(null));
      })
      .catch(error => console.log(error));
  }

  return (
    <div className={`${styles.menu} pl-5`}>
      <div className={styles.nav}>
        <NavLink
          end
          to={pages.PROFILE_PAGE}
          className={getLinkClass}>
          Профиль
        </NavLink>
        <NavLink
          end
          to={pages.PROFILE_ORDERS_PAGE}
          className={getLinkClass}>
          История заказов
        </NavLink>
        <Link
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
          onClick={logout}>
          Выход
        </Link>
      </div>
      <p className={`text text_type_main-default ${styles.description}`}>
        В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные&nbsp;данные
      </p>
    </div>
  )
}