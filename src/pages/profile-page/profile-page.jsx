import { NavLink } from "react-router-dom";
import styles from "./profile-page.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import * as pages from "../../utils/pages"

function getLinkClass({ isActive }) {
  return `${styles.link} text text_type_main-medium ` + (isActive ? styles.active_link : 'text_color_inactive');
}

export function ProfilePage() {

  return (
    <main className={styles.main}>
      <div className={styles.container}>
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
              to={pages.ORDERS_HISTORY_PAGE}
              className={getLinkClass}>
              История заказов
            </NavLink>
            <NavLink
              end
              to="/logout"
              className={getLinkClass}>
              Выход
            </NavLink>
          </div>
          <p className={`text text_type_main-default ${styles.description}`}>
            В этом разделе вы можете изменить&nbsp;свои&nbsp;персональные&nbsp;данные
          </p>
        </div>
        <div className={styles.profile}>
          <form className={styles.form}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              // value={value}
              name={'name'}
              error={false}
              // ref={inputRef}
              // onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              // extraClass="ml-1"
              icon="EditIcon"
            />
            <Input
              type={'email'}
              placeholder={'E-mail'}
              // value={value}
              name={'name'}
              error={false}
              // ref={inputRef}
              // onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              // extraClass="ml-1"
              icon="EditIcon"
            />
            <PasswordInput
              // onChange={onChange}
              // value={value}
              name={'password'}
              icon="EditIcon"
            />
            <div className={styles.buttons}>
              <Button htmlType="button" type="secondary" size="medium" extraClass={styles.cancel}>
                Отмена
              </Button>
              <Button htmlType="button" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}