import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from "./reducers";
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import { wsActions as wsFeedOrdersActions } from './actions/wsFeedOrders';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk,
  socketMiddleware(wsFeedOrdersActions),
));

const initialState = {
  burgerIngredients: {
    loaded: false,
    ingredients: []
  },
  cart: {
    bun: null,
    ingredients: [],
    order: null
  }
}

export const store = createStore(rootReducer, initialState, enhancer);