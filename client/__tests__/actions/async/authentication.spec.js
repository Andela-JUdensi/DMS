import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import {
  signInAction,
  signOut,
} from '../../../actions/authentication.action';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('asynchronous authentication actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates SHOW_ONLY_PUBLIC_DOCUMENTS and SET_CURRENT_USER when user logs out', () => {
    moxios.stubRequest('/api/users/logout', {
      status: 200,
      response: {
        user: { access: 'public' }
      }
    });

    const documents = {};
    const expectedActions = [{
      type: 'SET_CURRENT_USER',
      user: {}
    }, {
      access: 'public',
      type: 'SHOW_ONLY_PUBLIC_DOCUMENTS'
    }];
    const store = mockStore();

    return store.dispatch(signOut())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates SET_CURRENT_USER when user logs in', () => {
    moxios.stubRequest('/api/users/login/', {
      status: 200,
      response: {
        user: {}
      }
    });

    const documents = {};
    const expectedActions = [{
      type: 'SET_CURRENT_USER',
      user: null
    }];
    const store = mockStore();

    return store.dispatch(signInAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});