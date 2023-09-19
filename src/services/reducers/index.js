import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { cartReducer } from "./cart";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  cart: cartReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer
});