import { Ingredient } from "../../utils/types";
import {
  BurgerIngredientsActions,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS 
} from "../actions/burger-ingredients";

type BurgerIngredientsState = {
  loaded: boolean;
  ingredients: Ingredient[];
}

const initialState: BurgerIngredientsState = {
  loaded: false,
  ingredients: []
}

export const burgerIngredientsReducer = (state = initialState, action: BurgerIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        loaded: false,
        ingredients: []
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        ingredients: action.ingredients
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        loaded: false
      };
    }
    default: {
      return state;
    }
  }
}