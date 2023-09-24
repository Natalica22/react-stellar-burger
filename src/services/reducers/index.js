import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { cartReducer } from "./cart";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  cart: cartReducer,
  order: orderReducer
});