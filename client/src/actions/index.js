import * as Cookies from 'js-cookie';


// export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST"
// export const fetchUserRequest = () => ({
//   type: FETCH_USER_REQUEST,
//   loading: true
// })

// export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"
// export const fetchUserSuccess = user => ({
//   type: FETCH_USER_SUCCESS,
//   loading: false,
//   error: null,
//   user
// })

// export const FETCH_USER_ERROR = "FETCH_USER_ERROR"
// export const fetchUserError = err => ({
//   type: FETCH_USER_ERROR,
//   loading: false,
//   error: err
// })

export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const getUserInfoSuccess = (userInfo, addCount) => ({
  type: GET_USER_INFO_SUCCESS,
  userInfo,
  addCount
})

export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';
export const getuserInfoError = (err) => ({
  type: GET_USER_INFO_ERROR,
  err
})

export const POST_LIST_SUCCESS = 'POST_LIST_SUCCESS';
export const postListSuccess = (data) => ({
  type: POST_LIST_SUCCESS,
  data
})

export const PUT_USER_REQUEST = "PUT_USER_REQUEST"
export const putUserRequest = () => ({
  type: PUT_USER_REQUEST,
  loading: true
})

export const PUT_USER_SUCCESS = "PUT_USER_SUCCESS"
export const putUserSuccess = newGift => ({
  type: PUT_USER_SUCCESS,
  loading: false,
  error: null,
  newGift
})

export const PUT_USER_ERROR = "PUT_USER_ERROR"
export const putUserError = err => ({
  type: PUT_USER_ERROR,
  loading: false,
  error: err
})

export const SELECT_UPDATE_GIFT = "SELECT_UPDATE_GIFT"
export const selectUpdateGift = index => ({
  type: SELECT_UPDATE_GIFT,
  index
})

export const UPDATE_GIFT = "UPDATE_GIFT"
export const updateGift = gift => ({
  type: UPDATE_GIFT,
  gift
})

export const ASYNC_UPDATE_GIFT = "ASYNC_UPDATE_GIFT"
export const asyncUpdateGift = (name, price_range, link, note) => ({
  type: ASYNC_UPDATE_GIFT,
  name,
  price_range,
  link,
  note
})

// export const getUser = userId => dispatch => {
//   dispatch(fetchUserRequest())
//   return fetch(`/api/users/${userId}`)
//     .then(user => {
//       return user.json()
//     })
//     .then(data => {
//       dispatch(fetchUserSuccess(data))
//     })
//     .catch(err => {
//       console.error("FETCH_USER_ERROR", err)
//       dispatch(fetchUserError(err))
//     })
// }

export const getUserInfo = () => dispatch => {
  const accessToken = Cookies.get('accessToken');
  fetch('/api/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    if(!res.ok){
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(userInfo => {
    console.log('userInfo ->',userInfo);
    dispatch(getUserInfoSuccess(userInfo))
  });
}

function fetchApi(path, method, body) {
  const baseUrl = "/api"

  return fetch(`${baseUrl}/${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
}

export function addList(user, _list) {
  var list=_list
  if(!user) {return}
  if(!list) {
    fetch.post('/api/list', {
      title: "My List"
    }).then((data) => {
      return {
        list:data._id,
        user:user
      }
    }).then(postList) 
  } else {
      postList({
        list:list,
        user:user
      })
  }
}

export function postList(data, dispatch) {
  fetch.post('/api/user/'+data.user+'/list/'+data.list,{
  }).then(data => {
    console.log(data);
    dispatch(postListSuccess(data));
  })
}

// export const addGift = (userId, newGift) => (dispatch, getState) => {
//   dispatch(putUserRequest())
//   let giftId = Math.round(Math.random() * 1000000)
//   return fetchApi(`users/${userId}/add`, "PATCH", {
//     name: newGift,
//     giftId: giftId,
//     purchased: false,
//   })
//     .then(() => {
//       dispatch(putUserSuccess({ name: newGift, giftId, purchased: false }))
//     })
//     .catch(err => {
//       console.error(err)
//       dispatch(putUserError(err))
//     })
// }

export const UPDATE_GIFTS = "UPDATE_GIFTS"
export const UPDATE_GIFTS_SUCCESS = "UPDATE_GIFTS_SUCCESS"
export const UPDATE_GIFTS_ERROR = "UPDATE_GIFTS_ERROR"

// export function updateGifts(userId, currentGiftIndex, gifts) {
//   return async dispatch => {
//     dispatch({ type: UPDATE_GIFT })

//     try {
//       console.log(gifts)
//       console.log(userId)
//       const res = await fetchApi(
//         `users/${userId}/${currentGiftIndex}`,
//         "PATCH",
//         gifts
//       )
      
//       dispatch(getUserInfo(userInfo))

//       return dispatch({ type: UPDATE_GIFTS_SUCCESS, data: res.data })
//     } catch (e) {
//       return dispatch({ type: UPDATE_GIFTS_ERROR, e })
//     }
//   }
// }
