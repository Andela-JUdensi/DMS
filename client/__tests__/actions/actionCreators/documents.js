import {
  GET_DOCUMENTS_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_SUCCESS
} from '../../../actions/types';
import {
  getDocumentSuccess,
  addDocumentSuccess,
  deleteDocumentSuccess,
} from '../../../actions/documents.action';


describe('Document actions', () => {
  it('should create an action to add a document', () => {
    const document = {};
    const expectedAction = {
      type: ADD_DOCUMENT_SUCCESS,
      document
    }
    expect(addDocumentSuccess(document)).toEqual(expectedAction)
  })

  it('should create an action to get documents', () => {
    const documents = {};
    const expectedAction = {
      type: GET_DOCUMENTS_SUCCESS,
      documents
    }
    expect(getDocumentSuccess(documents)).toEqual(expectedAction)
  })

  it('should create an action to delete a document', () => {
    const documentId = 5;
    const expectedAction = {
      type: DELETE_DOCUMENT_SUCCESS,
      documentId
    }
    expect(deleteDocumentSuccess(documentId)).toEqual(expectedAction)
  })
})