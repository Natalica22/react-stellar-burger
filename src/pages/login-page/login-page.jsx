import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./login-page.module.css";
import { Link } from 'react-router-dom';

export function LoginPage() {

  return (
    <div className={styles.container}>
      <form className={`${styles.form} pb-20`}>
        <h2 className='text text_type_main-medium'>Вход</h2>
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
        />
        <PasswordInput
          // onChange={onChange}
          // value={value}
          name={'password'}
          icon="ShowIcon"
        />
      <Button htmlType="button" type="primary" size="medium">
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
    </div>
  )
}