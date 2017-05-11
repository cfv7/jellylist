import {
  GET_LIST
} from '../actions/list';

const initialState = {
  list: [],
  isFetched: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        list: action.list
      }
    default:
      return state;
  }
};