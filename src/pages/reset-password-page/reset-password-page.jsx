import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./reset-password-page.module.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD_PASSED } from '../../utils/constants';
import { useRef, useState } from 'react';
import { api } from '../../utils/api';
import { HOME_PAGE, LOGIN_PAGE } from '../../utils/pages';

export function ResetPasswordPage() {
  if (!localStorage.getItem(FORGOT_PASSWORD_PASSED)) {
    return <Navigate to={HOME_PAGE} />;
  } else {
    return <ResetPasswordPageImpl />
  }
}

function ResetPasswordPageImpl() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: '',
    token: ''
  });

  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = e => {
    e.preventDefault();
    api.resetPassword(form)
      .then(res => {
        localStorage.removeItem(FORGOT_PASSWORD_PASSED);
        navigate(LOGIN_PAGE);
      })
      .catch(err => setError(true));
  }

  return (
    <div className={styles.container}>
      <form className={`${styles.form} pb-20`} onSubmit={submitForm}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          icon="ShowIcon"
          placeholder={'Введите новый пароль'}
        />
        <Input
          onChange={onChange}
          type={'text'}
          placeholder={'Введите код из письма'}
          value={form.token}
          name={'token'}
          error={error}
          ref={inputRef}
          errorText={'Неверный код'}
          size={'default'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive pb-4'>
        Вспомнили пароль?
        <Link className={`${styles.link} pl-2`} to='/login'>Войти</Link>
      </p>
    </div>
  )
}