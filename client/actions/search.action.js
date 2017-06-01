import axios from 'axios';
import { GET_SEARCH_SUCCESS } from '../actions/types';

export const getSearchSuccess = search => ({
  type: GET_SEARCH_SUCCESS,
  search
});

export const searchAction = (searchToken, offset = 0, access = 'all') =>
  dispatch => axios.get(`/api/search/documents/?q=${searchToken}&offset=0&a=${access}`)
    .then((response) => {
      dispatch(getSearchSuccess(response.data));
    })
    .catch((error) => {
      throw error;
    });

