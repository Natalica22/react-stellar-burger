import { ACCESS_TOKEN, REFRESH_TOKEN, api } from "../../utils/api";
import { AppDispatch, LoginResponse, UserForm } from "../../utils/types";
import { setAuthChecked, setUser } from "./user";

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_ERROR: 'LOGIN_ERROR' = 'LOGIN_ERROR';

type LoginRequest = {
  readonly type: typeof LOGIN_REQUEST;
}

type LoginSuccess = {
  readonly type: typeof LOGIN_SUCCESS;
  payload: LoginResponse
}

type LoginError = {
  readonly type: typeof LOGIN_ERROR;
  payload: string
}

export type LoginActions = 
  | LoginRequest
  | LoginSuccess
  | LoginError;

export function loginUser(user: UserForm) {
  return (dispatch: AppDispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    api.login(user)
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, payload: res });

        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(error => dispatch({ type: LOGIN_ERROR, payload: error.message }));
  }
}