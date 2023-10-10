import { FEED_WS_CLOSE, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN } from "../actions/wsFeedOrders";

const initialState = {
  connected: false,
  data: null,
  error: null
};

export const wsFeedOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_WS_OPEN:
      return {
        ...state,
        error: null,
        connected: true
      };

    case FEED_WS_ERROR:
      return {
        ...state,
        error: action.payload,
        connected: false
      };

    case FEED_WS_CLOSE:
      return {
        ...state,
        error: null,
        connected: false
      };

    case FEED_WS_MESSAGE:
      return {
        ...state,
        error: null,
        data: action.payload
      };

    default:
      return state;
  }
};