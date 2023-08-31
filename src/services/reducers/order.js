import {
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS
} from "../actions/order";

export const orderReducer = (state = null, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {};
    }
    case CREATE_ORDER_SUCCESS: {
      return action.order;
    }
    case CREATE_ORDER_ERROR: {
      return null;
    }
    case CLOSE_ORDER_MODAL: {
      return null;
    }
    default: {
      return state;
    }
  }
}