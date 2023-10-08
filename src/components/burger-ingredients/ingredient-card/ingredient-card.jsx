import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { ingredientPropType } from "../../../utils/prop-types";
import { useSelector } from "react-redux";
import { useDrag } from 'react-dnd';
import { bun } from "../../../utils/constants";
import { Link, useLocation } from "react-router-dom";


export default function IngredientCard({ ingredient }) {
  const location = useLocation();

  const getCount = store => {
    if (ingredient.type === bun) {
      return store.cart.bun && store.cart.bun._id === ingredient._id ? 2 : 0;
    } else {
      return store.cart.ingredients.filter(e => e._id === ingredient._id).length;
    }
  }

  const count = useSelector(getCount);

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1
    })
  });

  return (
    <Link ref={ref} className={`${styles.card} text text_color_primary`} style={{ opacity }}
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
      <div className={`${styles.price}  pt-2 pb-2`}>
        <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientPropType.isRequired,
}