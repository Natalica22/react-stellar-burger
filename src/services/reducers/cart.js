import { bun } from "../../utils/constants";
import { ADD_INGREDIENT } from "../actions/cart";

const initialState = {
  bun: null,
  ingredients: []
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === bun) {
        return {
          ...state,
          bun: action.ingredient
        }
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, action.ingredient]
        }
      }
    }
    default: {
      return state;
    }
  }
}