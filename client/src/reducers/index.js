import * as actions from '../actions';

const initialState = {
  user: {},
  loading: false,
  error: null,
  currentGiftIndex: 0,
};

export const usersReducer = (state = initialState, action) => {
  if (action.type === actions.FETCH_USER_REQUEST) {
    return Object.assign({}, state, { loading: true }); //WH: seems to vary between using Object.assign and using ...state. Don't know if that's necessarily a problem though
  } else if (action.type === actions.FETCH_USER_SUCCESS) {
    return {
      ...state,
      user: action.user,
      loading: false,
      error: action.error,
    };
  } else if (action.type === actions.FETCH_USER_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
    });
  } else if (action.type === actions.PUT_USER_REQUEST) {
    return Object.assign({}, state, {
      loading: action.loading,
      error: action.error,
    });
  } else if (action.type === actions.PUT_USER_SUCCESS) {
    console.log('PUT_USER_SUCCESS', action);
    let updatedUser = Object.assign({}, state.user, {
      giftlist: [...state.user.giftlist, action.newGift],
    });
    console.log(updatedUser);
    return Object.assign({}, state, {
      user: updatedUser,
    });
  } else if (action.type === actions.SELECT_UPDATE_GIFT) {
    return Object.assign({}, state, {
      currentGiftIndex: action.index,
    });
  } else if (action.type === actions.ASYNC_UPDATE_GIFT) { //WH: Not sure what this one does since it's mostly commented out
    // else if (action.type === actions.UPDATE_GIFT) {
    //   // let newlist = [...state.user.giftlist]
    //   // newlist.map(newlist => newlist.currentGiftIndex === action.currentGiftIndex ? {...newlist, } newlist)
    //   // giftlisttemp: state.giftlisttemp.map(giftlisttemp => giftlisttemp.id=== gift ? {...giftlist})
    //   // let updatedUser = Object.assign({}, state.user, {giftlist: giftlisttemp })
    //   return Object.assign({}, state, {
    //     user: updatedUser
    //   })
    // }
    console.log('reducer ->', action);
    return state;
    // return Object.assign({}, state. {

    // }
  }
  return state;
};
