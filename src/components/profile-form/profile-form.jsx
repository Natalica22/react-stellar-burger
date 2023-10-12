import styles from "./profile-form.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { patchUser } from "../../services/actions/user";
import { useEffect, useRef, useState } from "react";
import { useForm } from "../../hooks/useForm";

export function ProfileForm() {
  const dispatch = useDispatch();

  const getUser = store => store.user.user;

  const user = useSelector(getUser);

  const { form, onChange, setForm } = useForm({ ...user, password: '' });
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

  return (
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
  )
}