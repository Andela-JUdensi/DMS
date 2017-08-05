import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import {
  searchAction,
} from '../../../actions/search.action';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('asynchronous authentication actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates GET_SEARCH_SUCCESS on a successful search for a document', () => {
    moxios.stubRequest('/api/search/documents/?q=cheese&offset=0&a=all', {
      status: 200,
      response: {
        documents: {}
      }
    });

    const documents = {};
    const expectedActions = [{
      search: {
        documents: {}
      }, type: "GET_SEARCH_SUCCESS"
    }];
    const store = mockStore();

    return store.dispatch(searchAction('cheese', 1, 'all'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});