import {
  GET_DOCUMENTS_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  SHOW_ONLY_PUBLIC_DOCUMENTS,
  DELETE_DOCUMENT_SUCCESS,
  GET_SEARCH_SUCCESS,
  GET_DOCUMENTS_BY_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  documents: {},
};

let newState;
let rows;
const documentReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_DOCUMENTS_SUCCESS:
      return action.documents;
    case ADD_DOCUMENT_SUCCESS:
      return action.document;
    case SHOW_ONLY_PUBLIC_DOCUMENTS:
      rows = state.rows.filter(document => document.access === action.access);
      newState = Object.assign({}, state.documents, {
        count: rows.length,
        rows
      });
      return newState;
    case DELETE_DOCUMENT_SUCCESS:
      rows = state.rows.filter(document => document.id !== action.documentId);
      newState = Object.assign({}, state.documents, {
        count: rows.length,
        rows,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        pages: state.pages,
        totalCount: state.totalCount
      });
      return newState;
    case GET_SEARCH_SUCCESS:
      return Object.assign({}, state, action.search);
    case GET_DOCUMENTS_BY_USER_SUCCESS:
      return Object.assign({}, action.userDocuments);
    default: return state;
  }
};

export default documentReducer;
