import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngrediens } from "../../services/actions/burger-ingredients";
import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export function Home() {
  const dispatch = useDispatch();

  const getBurgerIngredientsLoaded = store => store.burgerIngredients.loaded;

  const loaded = useSelector(getBurgerIngredientsLoaded);

  React.useEffect(
    () => {
      dispatch(getIngrediens());
    },
    [dispatch]
  );

  return (
    <main className={styles.main}>
      {
        loaded &&
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      }
    </main>
  )
}