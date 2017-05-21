import axios from 'axios';
import {
  GET_USER_INFO_SUCCESS,
  GET_DOCUMENTS_BY_USER_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_SEARCH_USERS_SUCCESS
} from './types';


const getUserInformationSuccess = userInfo => ({
  type: GET_USER_INFO_SUCCESS,
  userInfo,
});

export const getUserAction = userID => dispatch => axios.get(`/api/users/${userID}`)
  .then((user) => {
    dispatch(getUserInformationSuccess(user.data));
  })
  .catch(() => {
  });

export const updateUserAction = (userID, userData) => dispatch => axios.put(`/api/users/${userID}`, userData)
  .then(() => {
  })
  .catch(() => {
  });


const getUserDocumentsSuccess = userDocuments => ({
  type: GET_DOCUMENTS_BY_USER_SUCCESS,
  userDocuments
});

export const userDocumentsAction = userID => dispatch => axios.get(`/api/users/${userID}/documents/`)
  .then((success) => {
    dispatch(getUserDocumentsSuccess(success.data.response));
  })
  .catch(() => {
  });

const getAllUsersSuccess = allUsers => ({
  type: GET_ALL_USERS_SUCCESS,
  allUsers
});

export const getAllUsersAction = (offset = 0) => dispatch => axios.get(`/api/users/?offset=${offset}`)
  .then((success) => {
    dispatch(getAllUsersSuccess(success.data));
  })
  .catch(() => {
  });


const searchUserSuccess = (usersSearch) => {
  return {
    type: GET_SEARCH_USERS_SUCCESS,
    usersSearch,
  };
};
export const searchUserAction = (query) => {
  return (dispatch) => {
    return axios.get(`/api/search/users/?q=${query}`)
      .then((success) => {
        dispatch(searchUserSuccess(success.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
