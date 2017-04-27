import { getList } from './list';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  }
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export function login(userId) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });

    try {
      const { data } = axios.get(`/api/users/${userId}`);

      await dispatch(getList(user.lists));
      await dispatch(loginSuccess({
        name: user.name
      }));
    } catch (e) {
      return dispatch(loginError(e));
    }
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}