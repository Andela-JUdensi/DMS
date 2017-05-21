import axios from 'axios';
import { GET_SEARCH_SUCCESS } from '../actions/types';

export const getSearchSuccess = search => ({
  type: GET_SEARCH_SUCCESS,
  search
});

export const searchAction = (searchToken, access = undefined) => dispatch => axios.get(`/api/search/documents/?q=${searchToken}&a=${access}`)
  .then((response) => {
    dispatch(getSearchSuccess(response.data));
  })
  .catch((error) => {
    // console.log(error);
  });

