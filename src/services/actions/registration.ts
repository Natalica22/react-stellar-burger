import { ACCESS_TOKEN, REFRESH_TOKEN, api } from "../../utils/api";
import { AppDispatch, RegistrationForm, RegistrationResponse } from "../../utils/types";
import { setAuthChecked, setUser } from "./user";

export const REGISTRATION_REQUEST: 'REGISTRATION_REQUEST' = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR: 'REGISTRATION_ERROR' = 'REGISTRATION_ERROR';

type RegistrationRequest = {
  readonly type: typeof REGISTRATION_REQUEST;
}

type RegistrationSuccess = {
  readonly type: typeof REGISTRATION_SUCCESS;
  payload: RegistrationResponse;
}

type RegistrationError = {
  readonly type: typeof REGISTRATION_ERROR;
  payload: string;
}

export type RegistrationActions = 
  | RegistrationRequest
  | RegistrationSuccess
  | RegistrationError;

export function registerUser(user: RegistrationForm) {
  return (dispatch: AppDispatch) => {
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