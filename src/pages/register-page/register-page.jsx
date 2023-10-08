import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./register-page.module.css";
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../services/actions/registration';
import { useForm } from '../../hooks/useForm';

export function RegisterPage() {
  const dispatch = useDispatch();

  const getError = store => store.registration.error;
  const error = useSelector(getError);
  const hasError = error != null;

  const {form, onChange} = useForm({ name: '', email: '', password: '' });
  const inputRef = useRef(null);

  const submitForm = e => {
    e.preventDefault();
    dispatch(registerUser(form));
  }

  return (
    <main className={styles.container}>
      <form className={`${styles.form} pb-20`} onSubmit={submitForm}>
        <h2 className='text text_type_main-medium'>Регистрация</h2>
        <Input
          onChange={onChange}
          type={'text'}
          placeholder={'Имя'}
          value={form.name}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          onChange={onChange}
          type={'email'}
          placeholder={'E-mail'}
          value={form.email}
          name={'email'}
          error={hasError}
          ref={inputRef}
          errorText={'Пользователь уже существует'}
          size={'default'}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          icon="ShowIcon"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive pb-4'>
        Уже зарегистрированы?
        <Link className={`${styles.link} pl-2`} to='/login'>Войти</Link>
      </p>
    </main>
  )
}