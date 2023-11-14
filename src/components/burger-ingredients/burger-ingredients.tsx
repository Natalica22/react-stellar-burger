import { useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import { bun, sauce, main, ingredientsTypes, ingredientsTitles } from "../../utils/constants";
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { getIngredients } from "../../utils/ingredients";
import { Ingredient, IngredientsTypes } from "../../utils/types";

type IngredientsGroups = {
  bun: Ingredient[];
  sauce: Ingredient[];
  main: Ingredient[];
}

export default function BurgerIngredients() {
  const ingredients = useSelector(getIngredients);

  const ingredientsByType = useMemo(() =>
    ingredients.reduce((result, e) => {
      result[e.type].push(e);
      return result;
    }, {
      bun: [],
      sauce: [],
      main: []
    } as IngredientsGroups), [ingredients]);

  const [bunRef, bunInView] = useInView({ threshold: 0.05 });
  const [sauceRef, sauceInView] = useInView({ threshold: 0.05 });
  const [mainRef, mainInView] = useInView({ threshold: 0.05 });

  const refByType = {
    bun: bunRef,
    sauce: sauceRef,
    main: mainRef
  }

  const currentIngridientTab = useMemo(() => bunInView ? bun : sauceInView ? sauce : mainInView ? main : null, [bunInView, sauceInView, mainInView]);

  const scrollToGroup = (ingredientType: IngredientsTypes) => {
    document.querySelector('#' + ingredientType)?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <section className={styles.ingredients}>
      <h1 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h1>
      <div className={styles.group_selector}>
        <Tab value={bun} active={currentIngridientTab === bun} onClick={() => scrollToGroup(bun)}>
          Булки
        </Tab>
        <Tab value={sauce} active={currentIngridientTab === sauce} onClick={() => scrollToGroup(sauce)}>
          Соусы
        </Tab>
        <Tab value={main} active={currentIngridientTab === main} onClick={() => scrollToGroup(main)}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.groups} custom-scroll`}>
        {ingredientsTypes.map(e => <IngredientsGroup title={ingredientsTitles[e]} ingredients={ingredientsByType[e]} key={e} inViewRef={refByType[e]} ingredientType={e} />)}
      </div>
    </section>
  );
}