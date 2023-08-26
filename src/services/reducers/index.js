import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { cartReducer } from "./cart";
import { ingredientDetailsReducer } from "./ingredient-details";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  cart: cartReducer,
  ingredientDetails: ingredientDetailsReducer
});