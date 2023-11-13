import { Ingredient } from "../../utils/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';

export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

export const CLEAN_CART: 'CLEAN_CART' = 'CLEAN_CART';

type AddIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  ingredient: Ingredient;
  uid: string;
}

type DeleteIngredient = {
  readonly type: typeof DELETE_INGREDIENT;
  index: number;
}

type MoveIngredient = {
  readonly type: typeof MOVE_INGREDIENT;
  fromIndex: number;
  toIndex: number;
}

type CleanCart = {
  readonly type: typeof CLEAN_CART;
}

export type CartActions = 
  | AddIngredient
  | DeleteIngredient
  | MoveIngredient
  | CleanCart;