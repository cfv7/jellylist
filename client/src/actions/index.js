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
  type: FETCH_USER_SUCCESS,
  loading: false,
  error: err
})

export const getUsers = () => dispatch => {
  dispatch(fetchUserRequest())
  return fetch('/api/userdata').then(user => {
    return user.json()
  })
  .then(data => {
    dispatch(fetchUserSuccess())
  })
  .catch(err => {
    console.error(err);
    dispatch(fetchUserError())
  })
}