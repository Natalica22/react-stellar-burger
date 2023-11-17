import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./login-page.module.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/actions/login';
import { useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { RootState, UserForm } from '../../utils/types';

export function LoginPage() {
  const dispatch = useDispatch();

  const getError = (store: RootState) => store.login.error;
  const error = useSelector(getError);
  const hasError = error != null;

  const {form, onChange} = useForm<UserForm>({ email: '', password: '' });

  const inputRef = useRef(null);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(form));
  }

  return (
    <main className={styles.container}>
      <form className={`${styles.form} pb-20`} onSubmit={submitForm}>
        <h2 className='text text_type_main-medium'>Вход</h2>
        <Input
          onChange={onChange}
          type={'text'}
          placeholder={'E-mail'}
          value={form.email}
          name={'email'}
          error={hasError}
          ref={inputRef}
          errorText={'Неверный логин или пароль'}
          size={'default'}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          icon="ShowIcon"
        />
      <Button htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive pb-4'>
        Вы — новый пользователь?
        <Link className={`${styles.link} pl-2`} to='/register'>Зарегистрироваться</Link>
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Забыли пароль?
        <Link className={`${styles.link} pl-2`} to='/forgot-password'>Восстановить пароль</Link>
      </p>
    </main>
  )
}