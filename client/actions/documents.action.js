import axios from 'axios';
import {
  GET_DOCUMENTS_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_SUCCESS
} from '../actions/types';

export const getDocumentSuccess = documents => ({
  type: GET_DOCUMENTS_SUCCESS,
  documents,
});

export const addDocumentSuccess = document => ({
  type: ADD_DOCUMENT_SUCCESS,
  document,
});

export const deleteDocumentSuccess = documentID => ({
  type: DELETE_DOCUMENT_SUCCESS,
  documentID,
});

export const getDocumentsAction = (limit = 12) => dispatch => axios.get(`/api/documents/?limit=${limit}`)
  .then((response) => {
    dispatch(getDocumentSuccess(response.data));
  })
  .catch(() => {
    // throw (error);
  });

export const addDocumentAction = documentData => dispatch => axios.post('/api/documents/', documentData)
  .then((response) => {
    dispatch(getDocumentSuccess(response));
  })
  .catch(() => {
    // throw (error);
  });


export const deleteDocumentAction = documentID => dispatch => axios.delete(`/api/documents/${documentID}`)
  .then((response) => {
    dispatch(deleteDocumentSuccess(documentID));
  })
  .catch(() => {
    // console.log(error);
  });

export const editDocumentAction = (documentID, documentData) => (dispatch) => {
  return axios.put(`/api/documents/${documentID}`, documentData)
    .then((response) => {
      dispatch(getDocumentsAction());
    })
    .catch(() => {
    });
};
