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
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import * as pages from "../../utils/pages"
import { checkUserAuth } from "../../services/actions/user";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { FORGOT_PASSWORD_PASSED } from "../../utils/constants";
import { FeedPage } from "../../pages/feed-page/feed-page";
import { OrderInfo } from "../order-info/order-info";
import { connectOrdersFeed, connectProfileOrders } from "../../services/actions/wsFeedOrders";
import { ProfileForm } from "../profile-form/profile-form";
import { ProfileOrders } from "../profile-orders/profile-orders";

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
      dispatch(checkUserAuth());

      localStorage.removeItem(FORGOT_PASSWORD_PASSED);
    },
    [dispatch]
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={pages.HOME_PAGE} element={<HomePage />} />
        <Route path={pages.FEED_PAGE} element={<FeedPage />} />
        <Route path={pages.FEED_ORDER_INFO_PAGE} element={<OrderInfo wsConnectAction={connectOrdersFeed()}/>} />
        <Route path={pages.INGREDIENT_DETAILS_PAGE} element={<IngredientDetails />} />
        <Route path={pages.LOGIN_PAGE} element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path={pages.REGISTER_PAGE} element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path={pages.FORGOT_PASSWORD_PAGE} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path={pages.RESET_PASSWORD_PAGE} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path={pages.PROFILE_PAGE} element={<OnlyAuth component={<ProfilePage />} />} >
          <Route path="" element={<ProfileForm />} />
          <Route path={pages.PROFILE_ORDERS_PATH} element={<ProfileOrders />} />
        </Route>
        <Route path={pages.PROFILE_ORDER_INFO_PAGE} element={<OnlyAuth component={<OrderInfo wsConnectAction={connectProfileOrders()} />} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path={pages.INGREDIENT_DETAILS_PAGE}
            element={
              <Modal handleCloseClick={handleModalClose}>
                <IngredientDetails modal={true} />
              </Modal>
            } />
          <Route path={pages.FEED_ORDER_INFO_PAGE}
            element={
              <Modal handleCloseClick={handleModalClose}>
                <OrderInfo wsConnectAction={connectOrdersFeed()} modal={true} />
              </Modal>
            } />
          <Route path={pages.PROFILE_ORDER_INFO_PAGE}
            element={
              <Modal handleCloseClick={handleModalClose}>
                <OrderInfo wsConnectAction={connectProfileOrders()} modal={true} />
              </Modal>
            } />
        </Routes>
      )}
    </div>
  );
}

export default App;
