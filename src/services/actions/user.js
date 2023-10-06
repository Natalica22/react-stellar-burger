import { ACCESS_TOKEN, REFRESH_TOKEN, api } from "../../utils/api"

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return api.getUser()
      .then((res) => dispatch(setUser(res.user)));
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const patchUser = (user) => {
  return (dispatch) => {
    api.patchUser(user)
      .then(res => {
        dispatch(setUser(res.user));
      });
  };
}