import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import {
  getUserAction,
  updateUserAction,
  userDocumentsAction,
  getAllUsersAction,
  searchUserAction,
  deleteUserAction
} from '../../../actions/users.action';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('asynchronous document actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates DELETE_USER_SUCCESS when succesfully deleted a user', () => {
    moxios.stubRequest('/api/users/1', {
      status: 200,
      response: {
        user: { status: 'deleted' }
      }
    });

    const documents = {};
    const expectedActions = [{
      type: "GET_USER_INFO_SUCCESS",
      userInfo: { user: { status: "deleted" }}
    }];
    const store = mockStore();

    return store.dispatch(getUserAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_SEARCH_USERS_SUCCESS on a succesfully search for user(s)', () => {
    moxios.stubRequest(`/api/search/users/?q=joshua&offset=${0}`, {
      status: 200,
      response: {
        data: {}
      }
    });

    const documents = {};
    const expectedActions = [{
      type: "GET_SEARCH_USERS_SUCCESS",
      "usersSearch": { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(searchUserAction('joshua', 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_ALL_USERS_SUCCESS on request for list of users', () => {
    moxios.stubRequest(`/api/users/?offset=${0}`, {
      status: 200,
      response: {
        data: {}
      }
    });

    const documents = {};
    const expectedActions = [{
      type: "GET_ALL_USERS_SUCCESS",
      "allUsers": { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(getAllUsersAction(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_DOCUMENTS_BY_USER_SUCCESS on request for a user documents(s)', () => {
    moxios.stubRequest(`/api/users/${1}/documents/`, {
      status: 200,
      response: {
        data: {}
      }
    });

    const documents = {};
    const expectedActions = [{
      type: "GET_DOCUMENTS_BY_USER_SUCCESS",
      "userDocuments": { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(userDocumentsAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_USER_INFO_SUCCESS on request to update a user', () => {
    moxios.stubRequest(`/api/users/${1}`, {
      status: 200,
      response: {
        data: {}
      }
    });

    const documents = {};
    const expectedActions = [{
      type: "UPDATE_USER_INFO_SUCCESS",
      userInfo: { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(updateUserAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates GET_USER_INFO_SUCCESS on request for a user\'s information', () => {
    moxios.stubRequest(`/api/users/${1}`, {
      status: 200,
      response: {
        data: {}
      }
    });

    const documents = {};
    const expectedActions = [{
      type: "GET_USER_INFO_SUCCESS",
      userInfo: { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(getUserAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});