import { ACCESS_TOKEN, REFRESH_TOKEN, api } from "../../utils/api";
import { SET_AUTH_CHECKED, SET_USER, setAuthChecked, setUser } from "./user";

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

export function registerUser(user) {
  return dispatch => {
    dispatch({ type: REGISTRATION_REQUEST });
    api.register(user)
      .then(res => {
        dispatch({ type: REGISTRATION_SUCCESS, payload: res });

        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(error => dispatch({ type: REGISTRATION_ERROR, payload: error.message }));
  }
}