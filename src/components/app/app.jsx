import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useSelector, useDispatch } from 'react-redux';

import styles from "./app.module.css";

import { getIngrediens } from "../../services/actions/burger-ingredients";

function App() {
  const dispatch = useDispatch();

  const { loaded } = useSelector(store => store.burgerIngredients);

  React.useEffect(
    () => {
      dispatch(getIngrediens());
    },
    [dispatch]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        loaded &&
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      }
    </div>
  );
}

export default App;
