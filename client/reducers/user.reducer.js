import {
  GET_USER_INFO_SUCCESS,
  DELETE_USER_SUCCESS,
} from '../actions/types';

const initialState = [];

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return Object.assign({}, action.userInfo);
    case DELETE_USER_SUCCESS:
      return { ...state, status: action.status};
    default: return state;
  }
};

export default userReducer;
