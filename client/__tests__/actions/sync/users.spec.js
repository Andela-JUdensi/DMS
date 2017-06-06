import {
  GET_USER_INFO_SUCCESS,
  GET_DOCUMENTS_BY_USER_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_SEARCH_USERS_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_ERROR,
} from '../../../actions/types';
import {
  getUserInformationSuccess,
  getUserDocumentsSuccess,
  getAllUsersSuccess,
  searchUserSuccess,
  updateUserInformationSuccess,
  updateUserInformationError,
  deleteUserSuccess,
  deleteUserFailure
} from '../../../actions/users.action';


describe('Users actions', () => {
  it('should get user information', () => {
    const userInfo = {};
    const expectedAction = {
      type: GET_USER_INFO_SUCCESS,
      userInfo
    }
    expect(getUserInformationSuccess(userInfo)).toEqual(expectedAction)
  });

  it('should get documents by a user', () => {
    const userDocuments = {};
    const expectedAction = {
      type: GET_DOCUMENTS_BY_USER_SUCCESS,
      userDocuments
    }
    expect(getUserDocumentsSuccess(userDocuments)).toEqual(expectedAction)
  });

  it('should get all users', () => {
    const allUsers = {};
    const expectedAction = {
      type: GET_ALL_USERS_SUCCESS,
      allUsers
    }
    expect(getAllUsersSuccess(allUsers)).toEqual(expectedAction)
  });

  it('should search for user(s)', () => {
    const usersSearch = {};
    const expectedAction = {
      type: GET_SEARCH_USERS_SUCCESS,
      usersSearch
    }
    expect(searchUserSuccess(usersSearch)).toEqual(expectedAction)
  });

  it('should update user information', () => {
    const userInfo = {};
    const expectedAction = {
      type: UPDATE_USER_INFO_SUCCESS,
      userInfo
    }
    expect(updateUserInformationSuccess(userInfo)).toEqual(expectedAction)
  });

  it('should dipatch error on failure to update user information', () => {
    const updateError = {};
    const expectedAction = {
      type: UPDATE_USER_INFO_ERROR,
      updateError
    }
    expect(updateUserInformationError(updateError)).toEqual(expectedAction)
  });

  it('should delete a user information', () => {
    const status = {};
    const expectedAction = {
      type: DELETE_USER_SUCCESS,
      status
    }
    expect(deleteUserSuccess(status)).toEqual(expectedAction)
  });

  it('should dipatch error on failure to delete a user', () => {
    const status = {};
    const expectedAction = {
      type: DELETE_USER_FAILURE,
      status
    }
    expect(deleteUserFailure(status)).toEqual(expectedAction)
  });
});
