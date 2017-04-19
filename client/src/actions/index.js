export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
  loading: true
});

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  loading: false,
  error: null,
  user
})

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const fetchUserError = (err) => ({
  type: FETCH_USER_ERROR,
  loading: false,
  error: err
})

export const PUT_USER_REQUEST = 'PUT_USER_REQUEST'
export const putUserRequest = () => ({
  type: PUT_USER_REQUEST,
  loading: true
})

export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS'
export const putUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  loading: false,
  error: null,
  user
})

export const PUT_USER_ERROR = 'PUT_USER_ERROR'
export const putUserError = (err) => ({
  type: FETCH_USER_ERROR,
  loading: false,
  error: err
})

export const getUser = (userId) => dispatch => {
  dispatch(fetchUserRequest())
  return fetch(`/api/users/${userId}`).then(user => {
    return user.json()
  })
  .then(data => {
    dispatch(fetchUserSuccess(data))
  })
  .catch(err => {
    console.error(err);
    dispatch(fetchUserError(err))
  })
}

export const addGift = (userId, newGift) => (dispatch, getState) => {
  dispatch(putUserRequest())
  const state = getState()
  return fetch(`/api/users/${userId}`, {
    method: 'put',
    body: JSON.stringify({id: userId, giftlist: [...state.user.giftlist, {name: newGift}]
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(putUserSuccess(console.log('submitted!')))
  .catch(err => {
    console.error(err);
    dispatch(fetchUserError(err))  
  })
}

// { id: ${userId}`, `${giftlist.newGift}