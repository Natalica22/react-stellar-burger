import { CLOSE_INGREDIENT_DETAILS, OPEN_INGREDIENT_DETAILS } from "../actions/ingredient-details";

export const ingredientDetailsReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS: {
      return action.ingredient;
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return null;
    }
    default: {
      return state;
    }
  }
}