import { store } from "../services/store";

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>

export type RegistrationForm = {
  name: string;
  email: string;
  password: string;
}

export type UserForm = {
  email: string;
  password: string;
}

export type ForgotPasswordForm = {
  email: string;
}

export type ResetPasswordForm = {
  password: string;
  token: string;
}

export type ProfileEditForm = {
  name: string;
  email: string;
  password: string;
}

export type User = {
  email: string;
  name: string;
}

export type LoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type RegistrationResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type Bun = 'bun';
export type Sauce = 'sauce';
export type Main = 'main';

export type IngredientsTypes = Bun | Sauce | Main;

export type Ingredient = {
  _id: string;
  name: string;
  type: IngredientsTypes;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type OrderStatusDone = 'done';
export type OrderStatusPending = 'pending';
export type OrderStatusCreated = 'created';

export type OrderStatus = OrderStatusDone | OrderStatusPending | OrderStatusCreated;

export type Order = {
  _id: string;
  name: string;
  ingredients: string[];
  status: OrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
  price: number;
};

export type CreateOrderResponse = {
  success: boolean;
  name: string;
  order: Order;
}

export type FeedMessage = {
  orders: Order[];
  success: boolean;
  total: number;
  totalToday: number;
}

export type RefType = (node?: Element | null | undefined) => void;

export type Uuid = {
  uid: string;
}

export type Countable = {
  count: number;
}