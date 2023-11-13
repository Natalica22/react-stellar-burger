import { REGISTRATION_ERROR, REGISTRATION_REQUEST, REGISTRATION_SUCCESS, RegistrationActions } from "../actions/registration";

type RegistrationState = {
  success: boolean;
  request: boolean;
  error: string | null;
}

export const initialState: RegistrationState = {
  success: false,
  request: false,
  error: null,
}

export const registrationReducer = (state = initialState, action: RegistrationActions) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {
        ...initialState,
        request: true
      }
    case REGISTRATION_SUCCESS:
      return {
        ...initialState,
        success: true
      }
    case REGISTRATION_ERROR:
      return {
        ...initialState,
        error: action.payload
      }
    default:
      return state;
  }
}