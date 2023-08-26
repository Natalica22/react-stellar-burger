import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { useSelector, useDispatch } from 'react-redux';

import styles from "./app.module.css";

import { OrderContext } from "../../services/order-context";
import { getIngrediens } from "../../services/actions/burger-ingredients";

function orderReducer(order, action) {
  switch (action.type) {
    case "changeBun":
      return { ...order, bun: action.ingredient };
    case "addIngredient":
      return { ...order, ingredients: [...order.ingredients, action.ingredient] };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const dispatch = useDispatch();

  const { loaded } = useSelector(store => store.burgerIngredients);

  const [order, dispatchOrder] = React.useReducer(orderReducer, {
    bun: null,
    ingredients: []
  });

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
          <OrderContext.Provider value={{ order, dispatchOrder }}>
            <BurgerIngredients />
            <BurgerConstructor />
          </OrderContext.Provider>
        </main>
      }
    </div>
  );
}

export default App;
