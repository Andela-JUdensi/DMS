import {
  GET_USER_INFO_SUCCESS,
  DELETE_USER_SUCCESS,
} from '../actions/types';

const userReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return action.userInfo;
    case DELETE_USER_SUCCESS:
      return action.status;
    default: return state;
  }
};

export default userReducer;
