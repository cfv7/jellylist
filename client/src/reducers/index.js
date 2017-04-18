import * as actions from '../actions'

const initialState = {
  user: "",
  giftlist: [],
  loading: false,
  error: null
}

export const usersReducer = (state=initialState, action) => {
  if (action.type === actions.FETCH_USER_REQUEST) {
    return Object.assign({}, state, {loading: action.loading})
  }
  else if (action.type === actions.FETCH_USER_SUCCESS) {
    return Object.assign({}, state, {
      user: state.user,
      email: state.email,
      birthday: state.birthday,
      giftlist: [action.giftlist],
      loading: action.loading,
      error: action.error
    })
  }
  else if (action.type === actions.FETCH_USER_ERROR) {
    return Object.assign({}, state, {
      loading: action.loading,
      error: action.error
    })
  }
  return state
}