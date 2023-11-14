import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { Ingredient, RootState } from "../../utils/types";

type Props = {
  modal?: boolean
}

export default function IngredientDetails({ modal }: Props) {
  const params = useParams();
  const getIngredient = (store: RootState): Ingredient | null => {
    return store.burgerIngredients.ingredients.find(elem => elem._id === params.ingredientId) || null
  }
  const ingredient = useSelector(getIngredient);

  return (
    ingredient &&
    <div className={modal ? styles.container_modal : styles.container}>
      <h2 className={`${modal ? styles.title_modal : ''} text text_type_main-large pt-3 pb-3`}>Детали ингредиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h3 className={`text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</h3>
      <ul className={`${styles.details} pb-5`}>
        <li className={styles.detail}>
          <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
        </li>
        <li className={styles.detail}>
          <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</p>
        </li>
        <li className={styles.detail}>
          <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
        </li>
        <li className={styles.detail}>
          <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}