import axios from 'axios';
import {
  GET_SEARCH_SUCCESS
} from '../actions/types';

/**
 * action dispatch searching for document(s)
 * @param {object} search - search result
 */
export const getSearchSuccess = search => ({
  type: GET_SEARCH_SUCCESS,
  search
});

/**
 * api get request searching for document(s)
 * @param {string} searchToken - search tokens
 * @param {integer} offset - point to begin database fetch
 * @param {string} access - role access for documents
 */
export const searchAction = (searchToken, offset = 0, access = 'all') =>
  dispatch =>
    axios.get(`/api/search/documents/?q=${searchToken}&offset=0&a=${access}`)
      .then((response) => {
        dispatch(getSearchSuccess(response.data));
      })
      .catch((error) => {
        throw error;
      });

