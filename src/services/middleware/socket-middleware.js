import { ACCESS_TOKEN } from "../../utils/api";
import { checkUserAuth } from "../actions/user";

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;
    let url = null;
    let isAuth = false;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
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
        socket = new WebSocket(url + (isAuth ? `?token=${localStorage.getItem(ACCESS_TOKEN).replace('Bearer ', '')}` : ''));
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = error => {
          dispatch({ type: onError, payload: error });
        };

        socket.onmessage = event => {
          const parsedData = JSON.parse(event.data);
          const { success, ...data } = parsedData;

          if (data.message === 'jwt expired' || data.message === 'Invalid or missing token') {
            socket.close();
            socket = null;
            dispatch(checkUserAuth());
            dispatch({ type: wsConnect, payload: { url, isAuth } });
          } else {
            dispatch({ type: onMessage, payload: parsedData });
          }
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};