import React, { useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { bun, sauce, main, ingredientsTypes, ingredientsTitles } from "../../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";


export default function BurgerIngredients() {
  const dispatch = useDispatch();

  const { ingredients } = useSelector(store => store.burgerIngredients);
  const [currentIngridientTab, setCurrentIngridientTab] = React.useState(bun);
  const selectedIngredient = useSelector(store => store.ingredientDetails);

  const closeModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
  }

  const ingredientsByType = useMemo(() => 
    ingredients.reduce((result, e) => {
      result[e.type].push(e);
      return result;
    }, {
      bun: [],
      sauce: [],
      main: []
    }), [ingredients]);

  return (
    <section className={styles.ingredients}>
      <h1 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h1>
      <div className={styles.group_selector}>
        <Tab value={bun} active={currentIngridientTab === bun} onClick={setCurrentIngridientTab}>
          Булки
        </Tab>
        <Tab value={sauce} active={currentIngridientTab === sauce} onClick={setCurrentIngridientTab}>
          Соусы
        </Tab>
        <Tab value={main} active={currentIngridientTab === main} onClick={setCurrentIngridientTab}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.groups} custom-scroll`}>
        {ingredientsTypes.map(e => <IngredientsGroup title={ingredientsTitles[e]} ingredients={ingredientsByType[e]} key={e} />)}
      </div>
      {
        selectedIngredient &&
        <Modal handleCloseClick={closeModal} title="Детали ингредиента">
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      }
    </section>
  );
}