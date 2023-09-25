import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./register-page.module.css";
import { Link } from 'react-router-dom';

export function RegisterPage() {

  return (
    <div className={styles.container}>
      <form className={`${styles.form} pb-20`}>
        <h2 className='text text_type_main-medium'>Регистрация</h2>
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
        />
        <PasswordInput
          // onChange={onChange}
          // value={value}
          name={'password'}
          icon="ShowIcon"
        />
      <Button htmlType="button" type="primary" size="medium">
        Зарегистрироваться
      </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive pb-4'>
        Уже зарегистрированы?
        <Link className={`${styles.link} pl-2`} to='/login'>Войти</Link>
      </p>
    </div>
  )
}