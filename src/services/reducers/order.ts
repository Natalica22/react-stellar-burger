import { Order } from "../../utils/types";
import {
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  OrderActions
} from "../actions/order";

type OrderState = {
  created: boolean;
  order: Order | null;
}

const initialState: OrderState = {
  created: false,
  order: null
}

export const orderReducer = (state = initialState, action: OrderActions) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return { ...state, created: true };
    }
    case CREATE_ORDER_SUCCESS: {
      return { ...state, order: action.order } ;
    }
    case CREATE_ORDER_ERROR: {
      return initialState;
    }
    case CLOSE_ORDER_MODAL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}