import {
  GET_DOCUMENTS_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  SHOW_ONLY_PUBLIC_DOCUMENTS,
  DELETE_DOCUMENT_SUCCESS,
  GET_SEARCH_SUCCESS,
  GET_DOCUMENTS_BY_USER_SUCCESS,
  UPDATE_DOCUMENT_SUCCESS,
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
      return Object.assign({}, action.document);
    case SHOW_ONLY_PUBLIC_DOCUMENTS:
      rows = state.rows.filter(document =>
        document.access === action.access);
      newState = Object.assign({}, state.documents, {
        count: rows.length,
        rows
      });
      return newState;
    case DELETE_DOCUMENT_SUCCESS:
      rows = state.rows.filter(document =>
        document.id !== action.document.documentId);
      return Object.assign({}, state.documents, {
        ...state,
        rows,
        status: action.document.status
      });
    case GET_SEARCH_SUCCESS:
      return Object.assign({}, state, action.search);
    case GET_DOCUMENTS_BY_USER_SUCCESS:
      return Object.assign({}, action.userDocuments);
    case UPDATE_DOCUMENT_SUCCESS:
      rows = [action.document,
        ...state.rows.filter(document =>
          document.id !== action.document.id)];
      return (Object.assign({}, {
        ...state,
        rows
      }));
    default: return state;
  }
};

export default documentReducer;
