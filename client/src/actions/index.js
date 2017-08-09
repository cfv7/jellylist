import * as Cookies from 'js-cookie';

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

export const UPDATE_GIFTS = "UPDATE_GIFTS"
export const UPDATE_GIFTS_SUCCESS = "UPDATE_GIFTS_SUCCESS"
export const UPDATE_GIFTS_ERROR = "UPDATE_GIFTS_ERROR"
