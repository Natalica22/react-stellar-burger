import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LoginActions } from "../actions/login"

type LoginState = {
  success: boolean;
  request: boolean;
  error: string | null;
}

export const initialState: LoginState = {
  success: false,
  request: false,
  error: null,
}

export const loginReducer = (state = initialState, action: LoginActions) => {
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