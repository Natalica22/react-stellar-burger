import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import styles from "./app.module.css";
import { data } from "../../utils/data";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingrediens={data}/>
        <BurgerConstructor ingrediens={data}/>
      </main>
    </div>
  );
}

export default App;
