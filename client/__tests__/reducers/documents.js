import {
  GET_DOCUMENTS_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  SHOW_ONLY_PUBLIC_DOCUMENTS,
  DELETE_DOCUMENT_SUCCESS,
  GET_SEARCH_SUCCESS,
  GET_DOCUMENTS_BY_USER_SUCCESS,
} from '../../actions/types';
import reducer from '../../reducers/documents.reducer';

describe('documents reducer', () => {
  const testDocuments = {
      rows: [
        {
          title: 'title one',
          access: 'public',
          id: 1
        },
        {
          title: 'title two',
          access: 'private',
          id: 2
        }
      ],
      count: 2,
      metaData: {
        currentPage: 1,
        pageSize: 1,
        pages: 1,
        totalCount: 2
      },
    }

  it('should return the initial state', () => {
    expect(reducer())
    .toEqual({
        documents: {},
      })
  });

  it('should handle GET_DOCUMENTS_SUCCESS', () => {
    expect(reducer([], {
      type: GET_DOCUMENTS_SUCCESS,
      documents: {
        rows: [],
        count: 0
      },
    }))
    .toEqual({count: 0, rows: []})
  });

  it('should handle ADD_DOCUMENT_SUCCESS', () => {
    expect(reducer([], {
      type: ADD_DOCUMENT_SUCCESS,
      document: {
        rows: [],
        count: 0
      },
    }))
    .toEqual({count: 0, rows: []})
  });

  it('should handle SHOW_ONLY_PUBLIC_DOCUMENTS', () => {
    const state = {
      rows: [
        {
          title: 'title one',
          access: 'public'
        },
        {
          title: 'title two',
          access: 'private'
        }
      ],
      count: 2
    }
    expect(reducer(state, {
      type: SHOW_ONLY_PUBLIC_DOCUMENTS,
      access: 'public'
    }))
    .toEqual({ count: 1, rows: [ {
      title: 'title one',
      access: 'public' } ]
    });
  });

  it('should handle DELETE_DOCUMENT_SUCCESS', () => {
    const state = testDocuments;
    expect(reducer(state, {
      type: DELETE_DOCUMENT_SUCCESS,
      document: { documentId: 5, status: 'deleted'}
    }).count)
    .toEqual(2);

    expect(reducer(state, {
      type: DELETE_DOCUMENT_SUCCESS,
      document: { documentId: 1, status: 'deleted'}
    }).rows[0].title)
    .toEqual('title two');
  });

  it('should handle GET_SEARCH_SUCCESS', () => {
    expect(reducer([], {
      type: GET_SEARCH_SUCCESS,
      search: testDocuments
    }).count)
    .toEqual(2);
  });

  it('should handle GET_DOCUMENTS_BY_USER_SUCCESS', () => {
    
    expect(reducer([], {
      type: GET_DOCUMENTS_BY_USER_SUCCESS,
      userDocuments: testDocuments
    }).count)
    .toEqual(2);
  });
})
