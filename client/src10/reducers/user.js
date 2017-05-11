import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/user';

const initialState = {
  logged: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return initialState;
    case LOGIN_SUCCESS:
      return {
        logged: true,
        ...action.user
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};