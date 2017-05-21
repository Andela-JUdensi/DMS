import { GET_USER_INFO_SUCCESS, GET_DOCUMENTS_BY_USER_SUCCESS } from '../actions/types';

const userReducer = (state = [], action = {}) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return action.userInfo;
    case GET_DOCUMENTS_BY_USER_SUCCESS:
      return Object.assign({}, state, {
        userDocuments: action.userDocuments
      });
    default: return state;
  }
};

export default userReducer;
