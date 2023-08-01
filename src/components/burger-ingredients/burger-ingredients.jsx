import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import { ingredientArrayPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

const bun = 'bun';
const sauce = 'sauce';
const main = 'main';

const ingredientsTypes = [bun, sauce, main];

const ingredients = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
}

export default function BurgerIngredients({ ingrediens }) {
  const [currentIngridientTab, setCurrentIngridientTab] = React.useState('bun');
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);

  const closeModal = () => {
    setSelectedIngredient(null);
  }

  const ingredientsByType = {
    bun: [],
    sauce: [],
    main: []
  };

  ingrediens.forEach(e => {
    ingredientsByType[e.type].push(e);
  });

  return (
    <section className={styles.ingredients}>
      <h1 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
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
        {ingredientsTypes.map(e => <IngredientsGroup title={ingredients[e]} ingredients={ingredientsByType[e]} key={e} setSelectedIngredient={setSelectedIngredient} />)}
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

BurgerIngredients.propTypes = {
  ingrediens: ingredientArrayPropType.isRequired
}