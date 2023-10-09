import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function getStatusText(status) {
  switch (status) {
    case "done":
      return "Выполнен";
    case "pending":
      return "Готовится";
    case "created":
      return "Создан";
    default:
      return null;
  }
}

export function OrderCard({ order, showStatus }) {
  const getIngredients = store => store.burgerIngredients.ingredients;
  const ingredients = useSelector(getIngredients);

  const orderIngredients = useMemo(() => order.ingredients
    .map(e => ingredients.find(i => e === i._id))
    .filter(e => e !== undefined), [ingredients]);

  const uniqueIngredients = orderIngredients.reduce((result, e) =>
    result.some(elem => elem._id === e._id) ? result : [...result, e], []);

  const otherIngredients = uniqueIngredients.length - 6;

  const price = orderIngredients.reduce((result, e) => e.price + result, 0);

  const status = getStatusText(order.status);

  return (
    <div className={styles.card}>
      <div className={styles.order}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <FormattedDate date={new Date(order.createdAt)}
          className="text text_type_main-default text_color_inactive" />
      </div>
      <div className={styles.container}>
        <p className="text text_type_main-medium">{order.name}</p>
        { showStatus && status &&
          <p className={`text text_type_main-default ${status === 'Выполнен' ? styles.status_done : ''}`}>{status}</p>
        }
      </div>
      <div className={styles.details}>
        <ul className={styles.ingredients}>
          {
            uniqueIngredients.slice(0, 6).map((e, i) => {
                const other = otherIngredients > 0 && i === 5;
                return (
                <li key={e._id} className={styles.ingredient}>
                  <img src={e.image_mobile} alt={e.name} className={`${styles.image} ${other && styles.image_hidden}`} />
                  {
                    other &&
                    <p className={`text text_type_main-default ${styles.counter}`}>+{otherIngredients}</p>
                  }
                </li>);
              }
            )
          }
        </ul>
        <div className={styles.price}>
          <p className="text text_type_digits-default pr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}