import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./forgot-password-page.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { api } from '../../utils/api';
import { FORGOT_PASSWORD_PASSED } from '../../utils/constants';
import { RESET_PASSWORD_PAGE } from '../../utils/pages';
import { useForm } from '../../hooks/useForm';
import { ForgotPasswordForm } from '../../utils/types';

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const {form, onChange} = useForm<ForgotPasswordForm>({ email: '' });
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    api.forgotPassword(form)
      .then(() => {
        localStorage.setItem(FORGOT_PASSWORD_PASSED, "true");
        navigate(RESET_PASSWORD_PAGE);
      })
      .catch(() => setError(true));
  }

  return (
    <main className={styles.container}>
      <form className={`${styles.form} pb-20`} onSubmit={submitForm}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <Input
          onChange={onChange}
          type={'email'}
          placeholder={'Укажите e-mail'}
          value={form.email}
          name={'email'}
          error={error}
          ref={inputRef}
          errorText={'Что-то пошло не так'}
          size={'default'}
        />
      <Button htmlType="submit" type="primary" size="medium">
        Восстановить
      </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive pb-4'>
        Вспомнили пароль?
        <Link className={`${styles.link} pl-2`} to='/login'>Войти</Link>
      </p>
    </main>
  )
}