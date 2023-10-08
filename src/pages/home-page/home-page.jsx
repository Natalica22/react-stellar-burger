import { useSelector} from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./home-page.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export function HomePage() {
  const getBurgerIngredientsLoaded = store => store.burgerIngredients.loaded;
  const loaded = useSelector(getBurgerIngredientsLoaded);

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