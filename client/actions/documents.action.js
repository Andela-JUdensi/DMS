import axios from 'axios';
import {
  GET_DOCUMENTS_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_SUCCESS
} from '../actions/types';

/**
 * action dispatched getting all dcuments
 * @param {object} documents - returned documents
 */
const getDocumentSuccess = documents => ({
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
const getDocumentsAction =
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
const addDocumentSuccess = document => ({
  type: ADD_DOCUMENT_SUCCESS,
  document,
});

/**
 * api post request to add document
 * @param {object} documentInformation - document information
 */
const addDocumentAction = documentInformation =>
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
 * @param {object} status - deleted document
 */
const deleteDocumentSuccess = document => ({
  type: DELETE_DOCUMENT_SUCCESS,
  document,
});

/**
 * api delete request for a document
 * @param {*} documentId - document id
 */
const deleteDocumentAction = documentId =>
  dispatch => axios.delete(`/api/documents/${documentId}`)
    .then((success) => {
      dispatch(deleteDocumentSuccess({ status: success.data.status, documentId}));
    });


const updateDocumentSuccess = (document) => {
  return {
    type: UPDATE_DOCUMENT_SUCCESS,
    document
  }
}
/**
 * api put request to update a document
 * @param {*} documentId - document id
 * @param {*} documentInformation - document Information
 */
const editDocumentAction = (documentId, documentInformation) =>
  dispatch => new Promise((resolve, reject) => {
    axios.put(`/api/documents/${documentId}/`, documentInformation)
      .then((success) => {
        resolve(dispatch(updateDocumentSuccess(success.data)));
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });


export {
  getDocumentSuccess,
  getDocumentsAction,
  addDocumentSuccess,
  addDocumentAction,
  deleteDocumentSuccess,
  deleteDocumentAction,
  updateDocumentSuccess,
  editDocumentAction
}