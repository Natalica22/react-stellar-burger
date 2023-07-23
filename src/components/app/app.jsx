import AppHeader from '../app-header/app-header';

import styles from "./app.module.css";
import { data } from "../../utils/data";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
    </div>
  );
}

export default App;
