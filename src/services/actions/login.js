import { ACCESS_TOKEN, REFRESH_TOKEN, api } from "../../utils/api";
import { setAuthChecked, setUser } from "./user";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function loginUser(user) {
  return dispatch => {
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