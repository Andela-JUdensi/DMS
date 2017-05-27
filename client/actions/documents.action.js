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

export const getDocumentsAction = (limit = 10, offset = 0) =>
  dispatch => axios.get(`/api/documents/?limit=${limit}&offset=${offset}`)
    .then((response) => {
      dispatch(getDocumentSuccess(response.data));
    })
    .catch((error) => {
      throw error;
    });


export const addDocumentAction = documentData =>
  dispatch => new Promise((resolve, reject) => {
    axios.post('/api/documents/', documentData)
      .then((response) => {
        dispatch(getDocumentSuccess(response));
        resolve(response);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

export const deleteDocumentAction = documentID =>
  dispatch => new Promise((resolve, reject) => {
    axios.delete(`/api/documents/${documentID}`)
      .then(() => {
        resolve(dispatch(deleteDocumentSuccess(documentID)));
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

export const editDocumentAction = (documentID, documentData) =>
  dispatch => new Promise((resolve, reject) => {
    axios.put(`/api/documents/${documentID}`, documentData)
      .then(() => {
        resolve(dispatch(getDocumentsAction()));
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
