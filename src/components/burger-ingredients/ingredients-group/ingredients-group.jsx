import { ingredientArrayPropType } from "../../../utils/prop-types";
import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./ingredients-group.module.css";
import PropTypes from "prop-types";

export default function IngredientsGroup({ title, ingredients, setSelectedIngredient }) {

  return (
    <div>
      <h2 className="pt-10 pb-6 text text_type_main-medium">{title}</h2>
      <ul className={`${styles.ingredients} pl-4 pr-2`}>
        {ingredients.map(e => <IngredientCard ingredient={e} key={e._id} setSelectedIngredient={setSelectedIngredient}/>)}
      </ul>
    </div>
  );
}

IngredientsGroup.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: ingredientArrayPropType.isRequired,
  setSelectedIngredient: PropTypes.func.isRequired
}