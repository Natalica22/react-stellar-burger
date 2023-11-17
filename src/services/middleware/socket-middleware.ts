import { Middleware } from "redux";
import { ACCESS_TOKEN } from "../../utils/api";
import { checkUserAuth } from "../actions/user";
import { WsActionsObject } from "../actions/wsFeedOrders";

export const socketMiddleware = (wsActions: WsActionsObject): Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    let url: string | null = null;
    let isAuth = false;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect) {
        url = action.payload.url;
        isAuth = action.payload.isAuth;
        socket = new WebSocket(url + (isAuth ? `?token=${localStorage.getItem(ACCESS_TOKEN)?.replace('Bearer ', '')}` : ''));
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = event => {
          const parsedData = JSON.parse(event.data);
          const { success, ...data } = parsedData;

          if (data.message === 'jwt expired' || data.message === 'Invalid or missing token') {
            socket?.close();
            socket = null;
            dispatch(checkUserAuth() as any);
            dispatch({ type: wsConnect, payload: { url, isAuth } });
          } else {
            dispatch({ type: onMessage, payload: parsedData });
          }
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};