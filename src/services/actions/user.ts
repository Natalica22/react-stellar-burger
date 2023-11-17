import { ACCESS_TOKEN, REFRESH_TOKEN, api } from "../../utils/api"
import { AppDispatch, ProfileEditForm, User } from "../../utils/types";

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';
export const SET_USER: 'SET_USER' = 'SET_USER';

type SetAuthChecked = {
  readonly type: typeof SET_AUTH_CHECKED;
  payload: boolean
}

type SetUser = {
  readonly type: typeof SET_USER;
  payload: User | null;
}

export type UserActions = 
  | SetAuthChecked
  | SetUser;

export const setAuthChecked = (value: boolean): SetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: User | null): SetUser => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    return api.getUser()
      .then((res) => dispatch(setUser(res.user)))
      .catch(error => console.log(error));
  };
};

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setUser(null));
      dispatch(setAuthChecked(true));
    }
  };
};

export const patchUser = (user: ProfileEditForm) => {
  return (dispatch: AppDispatch) => {
    api.patchUser(user)
      .then(res => {
        dispatch(setUser(res.user));
      })
      .catch(error => console.log(error));
  };
}