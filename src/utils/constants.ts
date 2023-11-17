import { Bun, IngredientsTypes, Main, Sauce } from "./types";

export const API_URL = "https://norma.nomoreparties.space/api";
export const FEED_WS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const PROFILE_ORDERS_WS_URL = 'wss://norma.nomoreparties.space/orders';

export const bun: Bun = 'bun';
export const sauce: Sauce = 'sauce';
export const main: Main = 'main';

export const ingredientsTypes: IngredientsTypes[] = [bun, sauce, main];

export const ingredientsTitles = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
}

export const FORGOT_PASSWORD_PASSED = 'forgotPasswordPassed';