import { RootState } from "./types";

export const getIngredients = (store: RootState) => store.burgerIngredients.ingredients;