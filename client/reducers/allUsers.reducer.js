import {
  GET_ALL_USERS_SUCCESS,
  GET_SEARCH_USERS_SUCCESS
} from '../actions/types';

const initialState = [];

const allUsersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return Object.assign({}, action.allUsers);
    case GET_SEARCH_USERS_SUCCESS:
      return Object.assign({}, action.usersSearch);
    default: return state;
  }
};

export default allUsersReducer;
