import {
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS 
} from "../actions/burger-ingredients";

const initialState = {
  loaded: false,
  ingredients: []
}

export const burgerIngredientsReducer = (state = initialState, action) => {
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