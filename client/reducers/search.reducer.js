import { GET_SEARCH_SUCCESS } from '../actions/types';

const documentReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_SEARCH_SUCCESS:
      return action.search;
    default: return state;
  }
};

export default documentReducer;
