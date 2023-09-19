import { createOrder } from "../../utils/api";
import { CLEAN_CART } from "./cart";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export function sendOrder(ingredients) {
  return function(dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });
    createOrder(ingredients).then(res => {
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
    });
  };
}