import { api } from "../../utils/api";
import { AppDispatch, Order } from "../../utils/types";
import { CLEAN_CART } from "./cart";

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR: 'CREATE_ORDER_ERROR' = 'CREATE_ORDER_ERROR';

export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' = 'CLOSE_ORDER_MODAL';

type CreateOrderRequest = {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

type CreateOrderSuccess = {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  order: Order;
}

type CreateOrderError = {
  readonly type: typeof CREATE_ORDER_ERROR;
}

type CloseOrderModal = {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

export type OrderActions = 
  | CreateOrderRequest
  | CreateOrderSuccess
  | CreateOrderError
  | CloseOrderModal;

export function sendOrder(ingredients: string[]) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });
    api.createOrder(ingredients).then(res => {
      if (res && res.success) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          order: res.order
        });
        dispatch({
          type: CLEAN_CART
        })
      } else {
        dispatch({
          type: CREATE_ORDER_ERROR
        });
      }
    })
    .catch(error => console.log(error));
  };
}