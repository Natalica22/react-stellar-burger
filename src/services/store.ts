import { rootReducer } from "./reducers";
import { socketMiddleware } from './middleware/socket-middleware';
import { wsActions as wsFeedOrdersActions } from './actions/wsFeedOrders';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(socketMiddleware(wsFeedOrdersActions)),
  devTools: true
});