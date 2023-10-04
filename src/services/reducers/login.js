import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/login"

export const initialState = {
  success: false,
  user: null,
  request: false,
  error: null,
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...initialState,
        request: true
      }
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        success: true,
        user: action.payload.user
      }
    case LOGIN_ERROR:
      return {
        ...initialState,
        error: action.payload
      }
    default:
      return state;
  }
}