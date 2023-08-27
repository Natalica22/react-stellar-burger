import { bun } from "../../utils/constants";
import {
  ADD_INGREDIENT,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS
} from "../actions/cart";

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
          ingredients: [...state.ingredients, action.ingredient]
        }
      }
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
    case CREATE_ORDER_FAILED: {
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
    default: {
      return state;
    }
  }
}