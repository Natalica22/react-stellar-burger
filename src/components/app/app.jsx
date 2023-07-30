import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import styles from "./app.module.css";
import { loadIngrediens } from "../../utils/api";

function App() {
  const [state, setState] = React.useState({
    ingrediens: [],
    loaded: false
  })

  React.useEffect(() => {
    const getIngrediens = async () => {
      setState({ ...state, loaded: false });
      const ingrediens = await loadIngrediens();
      setState({ ingrediens: ingrediens, loaded: true });
    }

    getIngrediens();
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        state.loaded &&
        <main className={styles.main}>
          <BurgerIngredients ingrediens={state.ingrediens} />
          <BurgerConstructor ingrediens={state.ingrediens} />
        </main>
      }
    </div>
  );
}

export default App;
