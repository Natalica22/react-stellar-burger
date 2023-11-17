import { User } from "../../utils/types";
import { SET_AUTH_CHECKED, SET_USER, UserActions } from "../actions/user";

type UserState = {
  user: User | null;
  isAuthChecked: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
}

export const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    default: 
      return state;
  }
}