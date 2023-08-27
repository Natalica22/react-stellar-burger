import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { ingredientPropType } from "../../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT } from "../../../services/actions/cart";
import { OPEN_INGREDIENT_DETAILS } from "../../../services/actions/ingredient-details";
import { bun } from "../../../utils/constants";

export default function IngredientCard({ ingredient }) {
  const dispatch = useDispatch();
  
  const onClick = () => {
    dispatch({ type: ADD_INGREDIENT, ingredient: ingredient })
    // dispatch({ type: OPEN_INGREDIENT_DETAILS, ingredient: ingredient });
  }

  const count = useSelector(store => {
    if (ingredient.type === bun) {
      return store.cart.bun && store.cart.bun._id === ingredient._id ? 2 : 0;
    } else {
      return store.cart.ingredients.filter(e => e._id === ingredient._id).length;
    }
  })

  return (
    <li className={styles.card} onClick={onClick}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={ingredient.image} alt={ingredient.name} className={styles.image}/>
      <div className={`${styles.price}  pt-2 pb-2`}>
        <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{ingredient.name}</p>
    </li>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientPropType.isRequired,
}