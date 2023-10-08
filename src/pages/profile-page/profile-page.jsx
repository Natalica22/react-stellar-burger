import { Link, NavLink } from "react-router-dom";
import styles from "./profile-page.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import * as pages from "../../utils/pages"
import { ACCESS_TOKEN, REFRESH_TOKEN, api } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { patchUser, setUser } from "../../services/actions/user";
import { useEffect, useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";

function getLinkClass({ isActive }) {
  return `${styles.link} text text_type_main-medium ` + (isActive ? styles.active_link : 'text_color_inactive');
}

export function ProfilePage() {
  const dispatch = useDispatch();

  const getUser = store => store.user.user;

  const user = useSelector(getUser);

  const {form, onChange, setForm} = useForm({ ...user, password: '' });
  const [editActive, setEditActive] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    setEditActive(!(user.name === form.name && user.email === form.email && form.password === ''));
  }, [form, user]);

  const submitForm = e => {
    e.preventDefault();
    dispatch(patchUser(form));
    setForm({ ...form, password: '' })
  }

  const resetForm = e => {
    e.preventDefault();
    setForm({ ...user, password: '' });
  }

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
        <div className={styles.profile}>
          <form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
            <Input
              onChange={onChange}
              type={'text'}
              placeholder={'Имя'}
              value={form.name}
              name={'name'}
              error={false}
              ref={nameInputRef}
              errorText={'Ошибка'}
              size={'default'}
              icon="EditIcon"
              onIconClick={() => nameInputRef.current.focus()}
            />
            <Input
              onChange={onChange}
              type={'email'}
              placeholder={'E-mail'}
              value={form.email}
              name={'email'}
              error={false}
              ref={emailInputRef}
              errorText={'Ошибка'}
              size={'default'}
              icon="EditIcon"
              onIconClick={() => emailInputRef.current.focus()}
            />
            <Input
              onChange={onChange}
              type={'password'}
              placeholder={'Пароль'}
              value={form.password}
              name={'password'}
              error={false}
              ref={passwordInputRef}
              errorText={'Ошибка'}
              size={'default'}
              icon="EditIcon"
              onIconClick={() => passwordInputRef.current.focus()}
            />
            {
              editActive &&
              <div className={styles.buttons}>
                <Button htmlType="reset" type="secondary" size="medium" extraClass={styles.cancel}>
                  Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            }
          </form>
        </div>
      </div>
    </main>
  )
}