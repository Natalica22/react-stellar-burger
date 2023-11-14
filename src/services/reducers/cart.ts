import { bun } from "../../utils/constants";
import { Ingredient, Uuid } from "../../utils/types";
import {
  ADD_INGREDIENT,
  CLEAN_CART,
  CartActions,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
} from "../actions/cart";

type CartState = {
  bun: Ingredient | null;
  ingredients: (Ingredient & Uuid)[];
}

const initialState: CartState = {
  bun: null,
  ingredients: []
}

export const cartReducer = (state = initialState, action: CartActions) => {
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
          ingredients: [...state.ingredients, { ...action.ingredient, uid: action.uid }]
        }
      }
    }
    case DELETE_INGREDIENT: {
      const newIngredients = [...state.ingredients];
      newIngredients.splice(action.index, 1);
      return {
        ...state,
        ingredients: newIngredients
      };
    }
    case CLEAN_CART: {
      return initialState;
    }
    case MOVE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.toIndex, 0, ingredients.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        ingredients: ingredients
      };
    }
    default: {
      return state;
    }
  }
}