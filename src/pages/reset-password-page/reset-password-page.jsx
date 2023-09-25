import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./reset-password-page.module.css";
import { Link } from 'react-router-dom';

export function ResetPasswordPage() {

  return (
    <div className={styles.container}>
      <form className={`${styles.form} pb-20`}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
        <PasswordInput
          // onChange={onChange}
          // value={value}
          name={'password'}
          icon="ShowIcon"
          placeholder={'Введите новый пароль'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          // value={value}
          name={'name'}
          error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          // extraClass="ml-1"
        />
        <Button htmlType="button" type="primary" size="medium">
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