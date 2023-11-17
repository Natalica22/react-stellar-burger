import { Ingredient, IngredientsTypes, RefType } from "../../../utils/types";
import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./ingredients-group.module.css";

type Props = {
  title: string;
  ingredients: Ingredient[];
  inViewRef: RefType;
  ingredientType: IngredientsTypes;
}

export default function IngredientsGroup({ title, ingredients, inViewRef, ingredientType }: Props) {

  return (
    <div ref={inViewRef} id={ingredientType}>
      <h2 className="pt-10 pb-6 text text_type_main-medium">{title}</h2>
      <ul className={`${styles.ingredients} pl-4 pr-2`}>
        {ingredients.map(e => <IngredientCard ingredient={e} key={e._id}/>)}
      </ul>
    </div>
  );
}