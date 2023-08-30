import { bun } from "../../utils/constants";
import {
  ADD_INGREDIENT,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT
} from "../actions/cart";

import { v4 as uuidv4 } from 'uuid';

const initialState = {
  bun: null,
  ingredients: [],
  order: null
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
          ingredients: [...state.ingredients, { ...action.ingredient, uid: uuidv4() }]
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
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        order: {}
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...initialState,
        order: action.order
      };
    }
    case CREATE_ORDER_ERROR: {
      return {
        ...state,
        order: null
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        order: null
      };
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