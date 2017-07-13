import {GET_USER_INFO_SUCCESS, GET_USER_INFO_ERROR} from "../actions"

const initialState = {
  user: {},
  loading: false,
  error: null,
  // currentGiftIndex: 0
  // userInfo: {}
  // allGiftLists: [id, id, id]
  // currentGiftList: [id]
  // currentGiftItems: [id, id, id]
}

export const usersReducer = (state = initialState, action) => {
  if (action.type === GET_USER_INFO_SUCCESS) {
    console.log('SUCCESS');
    return Object.assign({}, state, {
      userInfo: action.userInfo
    })
  }  
  if(action.type === GET_USER_INFO_ERROR) {
    console.log('USER ERROR');
    return Object.assign({}, state, {
      error: action.error
    })
  }
  
  // if (action.type === actions.FETCH_USER_REQUEST) {
  //   return Object.assign({}, state, { loading: true })
  // } else if (action.type === actions.FETCH_USER_SUCCESS) {
  //   return {
  //     ...state,
  //     user: action.user,
  //     loading: false,
  //     error: action.error
  //   }
  // } else if (action.type === actions.FETCH_USER_ERROR) {
  //   return Object.assign({}, state, {
  //     loading: false,
  //     error: action.error
  //   })
  // } else if (action.type === actions.PUT_USER_REQUEST) {
  //   return Object.assign({}, state, {
  //     loading: action.loading,
  //     error: action.error
  //   })
  // } else if (action.type === actions.PUT_USER_SUCCESS) {
  //   console.log("PUT_USER_SUCCESS", action)
  //   let updatedUser = Object.assign({}, state.user, {
  //     giftlist: [...state.user.giftlist, action.newGift]
  //   })
  //   console.log(updatedUser)
  //   return Object.assign({}, state, {
  //     user: updatedUser
  //   })
  // } else if (action.type === actions.SELECT_UPDATE_GIFT) {
  //   let updatedGift = state.user.giftlist.map((gift, i) => i === action.index ? {...gift, editing: !gift.editing} : gift);
  //   return {
  //      ...state,
  //      currentGiftIndex: action.index,
  //      user: {
  //        ...state.user,
  //        giftlist: updatedGift
  //      }
  //   } 
  // } else if (action.type === actions.ASYNC_UPDATE_GIFT) {
  //   console.log("reducer ->", action)
  //   return state
  // }
  return state
}