import IngredientCard from "../ingredient-card/ingredient-card";
import styles from "./ingredients-group.module.css";

export default function IngredientsGroup(props) {

  return (
    <div>
      <h2 className="pt-10 pb-6 text text_type_main-medium">{props.title}</h2>
      <ul className={`${styles.ingredients} pl-4 pr-2`}>
        {props.ingredients.map(e => <IngredientCard ingredient={e} key={e._id}/>)}
      </ul>
    </div>
  );
}