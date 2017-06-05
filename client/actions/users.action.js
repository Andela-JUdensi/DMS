import axios from 'axios';
import {
  GET_USER_INFO_SUCCESS,
  GET_DOCUMENTS_BY_USER_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_SEARCH_USERS_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_ERROR,
} from './types';

/**
 * action dispatched getting user information
 * @param {object} userInfo - user details
 */
export const getUserInformationSuccess = userInfo => ({
  type: GET_USER_INFO_SUCCESS,
  userInfo,
});

/**
 * api get request user information
 * @param {integer} userId - id of a user
 */
export const getUserAction = userId => dispatch =>
  axios.get(`/api/users/${userId}`)
    .then((user) => {
      dispatch(getUserInformationSuccess(user.data));
    })
    .catch(() => {
    });

/**
 * action dispatched updating user information on success
 * @param {object} userInfo - user details
 */
export const updateUserInformationSuccess = userInfo => ({
  type: UPDATE_USER_INFO_SUCCESS,
  userInfo,
});

/**
 * action dispatched getting user information on error
 * @param {string} updateError - error message
 */
export const updateUserInformationError = updateError => ({
  type: UPDATE_USER_INFO_ERROR,
  updateError,
});

/**
 * api put request update user information
 * @param {integer} userId - id of user to update
 * @param {object} userDetails - user information
 */
export const updateUserAction = (userId, userDetails) =>
  dispatch => axios.put(`/api/users/${userId}`, userDetails)
    .then((success) => {
      dispatch(updateUserInformationSuccess(success.data));
    })
    .catch((error) => {
      dispatch(updateUserInformationError(error.response.data.message));
    });

/**
 * action dispatched getting a user document(s)
 * @param {object} userDocuments - documents for a user
 */
export const getUserDocumentsSuccess = userDocuments => ({
  type: GET_DOCUMENTS_BY_USER_SUCCESS,
  userDocuments
});

/**
 * api get request for a user document(s)
 * @param {integer} userId - user id
 */
export const userDocumentsAction = userId =>
  dispatch => axios.get(`/api/users/${userId}/documents/`)
    .then((success) => {
      dispatch(getUserDocumentsSuccess(success.data));
    });

/**
 * action dispatched listing all users
 * @param {object} allUsers - all users
 */
export const getAllUsersSuccess = allUsers => ({
  type: GET_ALL_USERS_SUCCESS,
  allUsers
});

/**
 * api get request listing all users
 * @param {integer} offset - point to begin database fetch
 */
export const getAllUsersAction = (offset = 0) =>
  dispatch => axios.get(`/api/users/?offset=${offset}`)
    .then((success) => {
      dispatch(getAllUsersSuccess(success.data));
    });

/**
 * action dispatched searching for user(s)
 * @param {object} usersSearch - user(s) returned
 */
export const searchUserSuccess = usersSearch => ({
  type: GET_SEARCH_USERS_SUCCESS,
  usersSearch,
});

/**
 * api get request searching for user(s)
 * @param {string} query - search string
 * @param {integer} offset - point to begin database fetch
 */
export const searchUserAction = (query, offset = 0) =>
  (dispatch) => {
    return axios.get(`/api/search/users/?q=${query}&offset=${offset}`)
      .then((success) => {
        dispatch(searchUserSuccess(success.data));
      })
      .catch((error) => {
        throw error;
      });
};

/**
 * action dispatch deleting user on success
 * @param {string} status - api success response
 */
export const deleteUserSuccess = status => ({
  type: DELETE_USER_SUCCESS,
  status,
});

/**
 * action dispatch deleting user on error
 * @param {string} status - api failure response
 */
export const deleteUserFailure = status => ({
  type: DELETE_USER_FAILURE,
  status,
});

/**
 * api user delete request
 * @param {integer} userId - user id
 */
export const deleteUserAction = userId =>
  dispatch => new Promise((resolve, reject) => {
    axios.delete(`/api/users/${userId}`)
      .then((status) => {
        resolve(dispatch(deleteUserSuccess(status)));
      })
      .catch((error) => {
        reject(deleteUserFailure(error.response.data.message));
      });
  });
