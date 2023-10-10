export const FEED_WS_CONNECT = 'FEED_WS_CONNECT';
export const FEED_WS_DISCONNECT = 'FEED_WS_DISCONNECT';
export const FEED_WS_CONNECTING = 'FEED_WS_CONNECTING';
export const FEED_WS_OPEN = 'FEED_WS_OPEN';
export const FEED_WS_CLOSE = 'FEED_WS_CLOSE';
export const FEED_WS_ERROR = 'FEED_WS_ERROR';
export const FEED_WS_MESSAGE = 'FEED_WS_MESSAGE';

export const wsActions = {
  wsConnect: FEED_WS_CONNECT,
  wsDisconnect: FEED_WS_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_MESSAGE
}