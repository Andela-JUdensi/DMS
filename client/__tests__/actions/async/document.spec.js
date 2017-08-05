import configureMockStore from 'redux-mock-store';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moxios from 'moxios'
import {
  getDocumentsAction,
  addDocumentAction,
  deleteDocumentAction,
  editDocumentAction
} from '../../../actions/documents.action';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('asynchronous document actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates GET_DOCUMENTS_SUCCESS when fetching documents', () => {
    moxios.stubRequest('/api/documents/?limit=12&offset=0&order=ASC&access=all', {
      status: 200,
      response: {
        body: {
          rows: [],
          count: 0
        }
      }
    });

    const documents = {};
    const expectedActions = [{
      "documents": {
        body: {
          count: 0,
          rows: []
        }
      }, type: 'GET_DOCUMENTS_SUCCESS'
    }];
    const store = mockStore();

    return store.dispatch(getDocumentsAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  })

  it('creates ADD_DOCUMENTS_SUCCESS when adding a document', () => {
    moxios.stubRequest('/api/documents/', {
      status: 200,
      response: {
        data: {
          title: 'brown cat',
          body: 'a big fat cat',
          access: 'public'
        }
      }
    });

    const documents = {};
    const expectedActions = [{
      document: {
        data: {
          access: "public", 
          body: "a big fat cat", 
          title: "brown cat"}
        }, type: "ADD_DOCUMENT_SUCCESS"
      }];

    const store = mockStore();

    return store.dispatch(addDocumentAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates DELETE_DOCUMENT_SUCCESS when deleting a document', () => {
    moxios.stubRequest('/api/documents/1', {
      status: 200,
      response: {
        data: {
          id: 1,
          status: 'deleted'
        }
      }
    });

    const documents = {};
    const expectedActions = [{
      document: {
        documentId: 1,
        status: undefined
      },
      type: "DELETE_DOCUMENT_SUCCESS"
    }]

    const store = mockStore();

    return store.dispatch(deleteDocumentAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_DOCUMENT_SUCCESS when updating a document', () => {
    moxios.stubRequest('/api/documents/1/', {
      status: 200,
      response: {
        body: {
          data: { id: 1, title: 'updated document' }
        }
      }
    });

    const documentInformation = {
      title: 'updated document'
    };
    const expectedActions = [{
      "document": {
        "body": {
          "data": {
            "id": 1,
            "title": "updated document"
          }
        }
      }, "type": 'UPDATE_DOCUMENT_SUCCESS'
    }];

    const store = mockStore();

    return store.dispatch(editDocumentAction(1, documentInformation))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
