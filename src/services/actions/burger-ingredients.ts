import { api } from "../../utils/api";
import { AppDispatch, Ingredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

type GetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

type GetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: Ingredient[];
}

type GetIngredientsError = {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type BurgerIngredientsActions = 
  | GetIngredientsRequest
  | GetIngredientsSuccess
  | GetIngredientsError;

export function getIngrediens() {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    api.loadIngrediens().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_ERROR
        });
      }
    })
    .catch(error => console.log(error));
  };
}