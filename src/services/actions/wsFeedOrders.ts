import { FEED_WS_URL, PROFILE_ORDERS_WS_URL } from "../../utils/constants";
import { FeedMessage } from "../../utils/types";

export const FEED_WS_CONNECT: 'FEED_WS_CONNECT' = 'FEED_WS_CONNECT';
export const FEED_WS_DISCONNECT: 'FEED_WS_DISCONNECT' = 'FEED_WS_DISCONNECT';
export const FEED_WS_CONNECTING: 'FEED_WS_CONNECTING' = 'FEED_WS_CONNECTING';
export const FEED_WS_OPEN: 'FEED_WS_OPEN' = 'FEED_WS_OPEN';
export const FEED_WS_CLOSE: 'FEED_WS_CLOSE' = 'FEED_WS_CLOSE';
export const FEED_WS_ERROR: 'FEED_WS_ERROR' = 'FEED_WS_ERROR';
export const FEED_WS_MESSAGE: 'FEED_WS_MESSAGE' = 'FEED_WS_MESSAGE';

export type FeedWsConnect = {
  readonly type: typeof FEED_WS_CONNECT;
  payload: {
    url: string;
    isAuth?: boolean;
  };
}

type FeedWsDisconnect = {
  readonly type: typeof FEED_WS_DISCONNECT;
}

type FeedWsConnecting = {
  readonly type: typeof FEED_WS_CONNECTING;
}

type FeedWsOpen = {
  readonly type: typeof FEED_WS_OPEN;
}

type FeedWsClose = {
  readonly type: typeof FEED_WS_CLOSE;
}

type FeedWsError = {
  readonly type: typeof FEED_WS_ERROR;
  payload: string;
}

type FeedWsMessage = {
  readonly type: typeof FEED_WS_MESSAGE;
  payload: FeedMessage;
}

export type FeedWsActions = 
  | FeedWsConnect
  | FeedWsDisconnect
  | FeedWsConnecting
  | FeedWsOpen
  | FeedWsClose
  | FeedWsError
  | FeedWsMessage;

export type WsActionsObject = {
  wsConnect: typeof FEED_WS_CONNECT,
  wsDisconnect: typeof FEED_WS_DISCONNECT,
  wsConnecting: typeof FEED_WS_CONNECTING,
  onOpen: typeof FEED_WS_OPEN,
  onClose: typeof FEED_WS_CLOSE,
  onError: typeof FEED_WS_ERROR,
  onMessage: typeof FEED_WS_MESSAGE
}

export const wsActions: WsActionsObject = {
  wsConnect: FEED_WS_CONNECT,
  wsDisconnect: FEED_WS_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_MESSAGE
}

export function connectOrdersFeed(): FeedWsConnect {
  return {
    type: FEED_WS_CONNECT,
    payload: {
      url: FEED_WS_URL
    }
  };
}

export function connectProfileOrders(): FeedWsConnect {
  return {
    type: FEED_WS_CONNECT,
    payload: {
      url: PROFILE_ORDERS_WS_URL,
      isAuth: true 
    }
  };
}

export function disconnect(): FeedWsDisconnect {
  return {
    type: FEED_WS_DISCONNECT
  }
}