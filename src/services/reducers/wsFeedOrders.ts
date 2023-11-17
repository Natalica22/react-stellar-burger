import { FeedMessage } from "../../utils/types";
import { FEED_WS_CLOSE, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN, FeedWsActions } from "../actions/wsFeedOrders";

type WsFeedOrdersState = {
  connected: boolean;
  data: FeedMessage | null;
}

const initialState: WsFeedOrdersState = {
  connected: false,
  data: null,
};

export const wsFeedOrdersReducer = (state = initialState, action: FeedWsActions) => {
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
        connected: false
      };

    case FEED_WS_CLOSE:
      return {
        ...initialState
      };

    case FEED_WS_MESSAGE:
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
};