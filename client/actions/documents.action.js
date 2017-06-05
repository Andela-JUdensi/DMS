import axios from 'axios';
import {
  GET_DOCUMENTS_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_SUCCESS
} from '../actions/types';

/**
 * action dispatched getting all dcuments
 * @param {object} documents - returned documents
 */
export const getDocumentSuccess = documents => ({
  type: GET_DOCUMENTS_SUCCESS,
  documents,
});

/**
 * api get request fetching all documents
 * @param {integer} limit - maximum documents per call
 * @param {integer} offset - point to begin database fetch
 * @param {string} order - arrangement of data
 * @param {string} access - role access for documents
 */
export const getDocumentsAction =
  (limit = 12, offset = 0, order = 'ASC', access = 'all') =>
    dispatch =>
      axios.get(`/api/documents/?limit=${limit}&offset=${offset}&order=${order}&access=${access}`)
        .then((response) => {
          dispatch(getDocumentSuccess(response.data));
        })
        .catch((error) => {
          throw error;
        });

/**
 * action dispatched adding a document
 * @param {object} document - document added
 */
export const addDocumentSuccess = document => ({
  type: ADD_DOCUMENT_SUCCESS,
  document,
});

/**
 * api post request to add document
 * @param {object} documentInformation - document information
 */
export const addDocumentAction = documentInformation =>
  dispatch => new Promise((resolve, reject) => {
    axios.post('/api/documents/', documentInformation)
      .then((response) => {
        dispatch(addDocumentSuccess(response.data));
        resolve(response);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

/**
 * action dispatched deleting document
 * @param {integer} documentId - document id
 */
export const deleteDocumentSuccess = documentId => ({
  type: DELETE_DOCUMENT_SUCCESS,
  documentId,
});

/**
 * api delete request for a document
 * @param {*} documentId - document id
 */
export const deleteDocumentAction = documentId =>
  dispatch => new Promise((resolve, reject) => {
    axios.delete(`/api/documents/${documentId}`)
      .then(() => {
        dispatch(deleteDocumentSuccess(documentId));
        resolve(documentId);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });

/**
 * api put request to update a document
 * @param {*} documentId - document id
 * @param {*} documentInformation - document Information
 */
export const editDocumentAction = (documentId, documentInformation) =>
  dispatch => new Promise((resolve, reject) => {
    axios.put(`/api/documents/${documentId}/`, documentInformation)
      .then(() => {
        resolve(dispatch(getDocumentsAction()));
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
