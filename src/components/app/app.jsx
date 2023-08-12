import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import styles from "./app.module.css";
import { loadIngrediens } from "../../utils/api";

import { IngredientsContext } from "../../services/ingredients-context";
import { OrderContext } from "../../services/order-context";

function App() {
  const [loaded, setLoaded] = React.useState(false);

  const [ingredients, setIngredients] = React.useState([]);

  const [order, setOrder] = React.useState({
    bun: null,
    ingredients: []
  });

  React.useEffect(() => {
    const getIngrediens = async () => {
      setLoaded(false);
      setIngredients(await loadIngrediens());
      setLoaded(true);
    }

    getIngrediens();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        loaded &&
        <main className={styles.main}>
          <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
            <OrderContext.Provider value={{ order, setOrder }}>
              <BurgerIngredients />
              <BurgerConstructor />
            </OrderContext.Provider>
          </IngredientsContext.Provider>
        </main>
      }
    </div>
  );
}

export default App;
