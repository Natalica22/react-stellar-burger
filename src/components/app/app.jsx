import { useDispatch } from "react-redux";
import { HomePage } from "../../pages/home-page/home-page";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import styles from "./app.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { getIngrediens } from "../../services/actions/burger-ingredients";
import { LoginPage } from "../../pages/login-page/login-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { RegisterPage } from "../../pages/register-page/register-page";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  React.useEffect(
    () => {
      dispatch(getIngrediens());
    },
    [dispatch]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={ background || location }>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:ingredientId"
          element={<IngredientDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:ingredientId"
            element={
              <Modal handleCloseClick={handleModalClose}>
                <IngredientDetails modal={true} />
              </Modal>
            } />
        </Routes>
      )}
    </div>
  );
}

export default App;
