import {
  GET_DOCUMENTS_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  SHOW_ONLY_PUBLIC_DOCUMENTS,
  DELETE_DOCUMENT_SUCCESS
} from '../actions/types';

let newState;
let rows;
const documentReducer = (state = {}, action = {}) => {
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
      rows = state.rows.filter(document => document.id !== action.documentID);
      newState = Object.assign({}, state.documents, {
        count: rows.length,
        rows,
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        pages: state.pages,
        totalCount: state.totalCount
      });
      return newState;
    default: return state;
  }
};

export default documentReducer;
