import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { ingredientPropType } from "../../../utils/prop-types";
import PropTypes from "prop-types";
import { OrderContext } from "../../../services/order-context";

export default function IngredientCard({ ingredient, setSelectedIngredient }) {
  const { dispatchOrder } = React.useContext(OrderContext);
  
  const onClick = () => {
    if (ingredient.type === "bun") {
      dispatchOrder({ type: "changeBun", ingredient: ingredient });
    } else {
      dispatchOrder({ type: "addIngredient", ingredient: ingredient });
    }
    // setSelectedIngredient(ingredient);
  }

  return (
    <li className={styles.card} onClick={onClick}>
      {ingredient.count > 0 && <Counter count={ingredient.count} size="default" extraClass="m-1" />}
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
  setSelectedIngredient: PropTypes.func.isRequired
}