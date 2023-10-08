import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/login"

export const initialState = {
  success: false,
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
        success: true
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