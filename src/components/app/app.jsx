import { Home } from "../../pages/home/home";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
