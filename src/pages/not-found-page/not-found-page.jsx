import styles from "./not-found-page.module.css";

export function NotFoundPage() {

  return (
    <main className={`${styles.container} pt-30`}>
      <h2 className='text text_type_main-large'>Страница не найдена</h2>
    </main>
  )
}