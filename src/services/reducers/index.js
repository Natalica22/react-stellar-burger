import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { cartReducer } from "./cart";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { registrationReducer } from "./registration";
import { loginReducer } from "./login";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
  registration: registrationReducer,
  login: loginReducer,
});