import * as actions from '../actions'

const initialState = {
  user: "",
  loading: false,
  error: null
}

export const usersReducer = (state=initialState, action) => {
  if (action.type === actions.FETCH_USER_REQUEST) {
    return Object.assign({}, state, {loading: action.loading})
  }
  else if (action.type === actions.FETCH_USER_SUCCESS) {
    return Object.assign({}, state, {
      user: action.user,
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
  else if (action.type === actions.PUT_USER_REQUEST) {
    return Object.assign({}, state, {
      loading: action.loading,
      error: action.error
    })
  }
  else if (action.type === actions.PUT_USER_SUCCESS) {
    console.log('PUT_USER_SUCCESS', action);
    let updatedUser = Object.assign({}, state.user, {giftlist: [...state.user.giftlist, action.newGift]  } )
    console.log(updatedUser);
    return Object.assign({}, state, {
      user: updatedUser
    })
  }
  return state
}