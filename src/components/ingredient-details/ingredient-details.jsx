import styles from "./ingredient-details.module.css";

export default function IngredientDetails({ ingredient }) {

  return (
    <>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h3 className={`text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</h3>
      <ul className={`${styles.details} pb-15`}>
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
    </>
  );
}