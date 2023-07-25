import React from "react";
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "../ingredients-group/ingredients-group";
import { data } from "../../utils/data";

const bun = 'bun';
const sauce = 'sauce';
const main = 'main';

const ingredientsTypes = [bun, sauce, main];

const ingredients = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
}

export default function BurgerIngredients() {
  const [currentIngridient, setCurrentIngridient] = React.useState('bun');

  const ingredientsByType = {
    bun: [],
    sauce: [],
    main: []
  };

  data.forEach(e => {
    ingredientsByType[e.type].push(e);
  });

  return (
    <section className={styles.ingredients}>
      <h1 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value={bun} active={currentIngridient === bun} onClick={setCurrentIngridient}>
          Булки
        </Tab>
        <Tab value={sauce} active={currentIngridient === sauce} onClick={setCurrentIngridient}>
          Соусы
        </Tab>
        <Tab value={main} active={currentIngridient === main} onClick={setCurrentIngridient}>
          Начинки
        </Tab>
      </div>
      {
        ingredientsTypes.map(e => <IngredientsGroup title={ingredients[e]} ingredients={ingredientsByType[e]} key={e} />)
      }
    </section>
  );
}