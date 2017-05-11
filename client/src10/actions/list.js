export const GET_LIST = 'GET_LIST';

export function getList(list) {
  return {
    type: GET_LIST,
    list
  }
}