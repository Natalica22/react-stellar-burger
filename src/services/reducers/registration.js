import { REGISTRATION_ERROR, REGISTRATION_REQUEST, REGISTRATION_SUCCESS } from "../actions/registration";

export const initialState = {
  success: false,
  request: false,
  error: null,
}

export const registrationReducer = (state = initialState, action) => {
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