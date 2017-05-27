import {
  GET_ALL_USERS_SUCCESS,
  GET_SEARCH_USERS_SUCCESS
} from '../actions/types';

const allUsersReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return action.allUsers;
    case GET_SEARCH_USERS_SUCCESS:
      return action.usersSearch;
    default: return state;
  }
};

export default allUsersReducer;
