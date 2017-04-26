export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
  loading: true,
});

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  loading: false,
  error: null,
  user,
});

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const fetchUserError = err => ({ //WH: I prefer naming the parameter error so you can just deconstruct it, writing error instead of error: err. See line 12
  type: FETCH_USER_ERROR,
  loading: false,
  error: err,
});

export const PUT_USER_REQUEST = 'PUT_USER_REQUEST';
export const putUserRequest = () => ({ //WH: Appears to be exact same as FETCH_USER_REQUEST
  type: PUT_USER_REQUEST,
  loading: true,
});

export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';
export const putUserSuccess = newGift => ({
  type: PUT_USER_SUCCESS,
  loading: false,
  error: null,
  newGift,
});

export const PUT_USER_ERROR = 'PUT_USER_ERROR';
export const putUserError = err => ({ //WH: again appears to be same as above
  type: PUT_USER_ERROR,
  loading: false,
  error: err,
});

export const SELECT_UPDATE_GIFT = 'SELECT_UPDATE_GIFT'; //WH: I'm not totally clear on what this does from the name
export const selectUpdateGift = index => ({
  type: SELECT_UPDATE_GIFT,
  index,
});

export const UPDATE_GIFT = 'UPDATE_GIFT';
export const updateGift = gift => ({
  type: UPDATE_GIFT,
  gift,
});

export const ASYNC_UPDATE_GIFT = 'ASYNC_UPDATE_GIFT';
export const asyncUpdateGift = (name, price_range, link, note) => ({
  type: ASYNC_UPDATE_GIFT,
  name,
  price_range,
  link,
  note,
});

export const getUser = userId => dispatch => {
  dispatch(fetchUserRequest());
  return fetch(`/api/users/${userId}`)
    .then(user => { //WH: FYI can be refactored into .then(user => user.json()). No brackets with arrow functions creates an implied return, but you can't use it with multiple lines.
      return user.json();
    })
    .then(data => {
      dispatch(fetchUserSuccess(data));
    })
    .catch(err => {
      console.error('FETCH_USER_ERROR', err);
      dispatch(fetchUserError(err));
    });
};

function fetchApi(path, method, body) {
  const baseUrl = '/api'; //WH: not sure helpfulness of this when the variable name is longer than the string and since baseUrl isn't being reused
  return fetch(`${baseUrl}/${path}`, {
    method,
    body: JSON.stringify(body), 
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export const addGift = (userId, newGift) => (dispatch, getState) => { //WH: I'm not sure what getState does, maybe it's something to do with dispatch, but it doesn't appear it's being called
  dispatch(putUserRequest());
  let giftId = Math.round(Math.random() * 1000000); //WH: although unlikely, this doesn't seem like a great long-term solution since it doesn't ensure every giftId will be unique. maybe something that should be handled by mongo
  return fetchApi(`users/${userId}/add`, 'PATCH', {
    name: newGift,
    giftId: giftId,
    purchased: false,
  })
    .then(() => {
      dispatch(putUserSuccess({ name: newGift, giftId, purchased: false }));
    })
    .catch(err => {
      console.error(err);
      dispatch(putUserError(err));
    });
};

// export const addGift = (userId, newGift) => (dispatch, getState) => {
//   dispatch(putUserRequest())
//   const state = getState()
//   const giftObject= {name: newGift};
//   return fetch(`/api/users/${userId}`, {
//     method: 'put',
//     body: JSON.stringify({id: userId, giftlist: [...state.user.giftlist, giftObject]
//     }),
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(() => {
//     dispatch(putUserSuccess(giftObject))
//   })
//   .catch(err => {
//     console.error(err);
//     dispatch(putUserError(err))
//   })
// }
// export const updateGift = () => {
//   const state= getState()
//   return fetch()
// }

// { id: ${userId}`, `${giftlist.newGift}

export const UPDATE_GIFTS = 'UPDATE_GIFTS'; //WH: not sure what these are doing
export const UPDATE_GIFTS_SUCCESS = 'UPDATE_GIFTS_SUCCESS';
export const UPDATE_GIFTS_ERROR = 'UPDATE_GIFTS_ERROR';

export function updateGifts(gifts) { //WH: Also not certain what's happening here but I'm unfamiliar with the syntax
  return async dispatch => {
    dispatch({ type: UPDATE_GIFT }); 

    try {
      const res = await fetchApi('API_URL', 'PATCH', gifts); //WH: does this not go to /api/API_URL, which doesn't look like a backend path?

      return dispatch({ type: UPDATE_GIFTS_SUCCESS, data: res.data });
    } catch (e) {
      return dispatch({ type: UPDATE_GIFTS_ERROR, e });
    }
  };
}
