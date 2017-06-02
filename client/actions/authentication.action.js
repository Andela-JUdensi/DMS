import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SHOW_ONLY_PUBLIC_DOCUMENTS } from './types';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const showOnlyPublicDocuments = () => ({
  type: SHOW_ONLY_PUBLIC_DOCUMENTS,
  access: 'public',
});

export const signOut = () => (dispatch) => {
  localStorage.removeItem('hermesToken');
  localStorage.removeItem('hermesuserId');
  localStorage.removeItem('hermesroleId');
  return axios.post('/api/users/logout')
    .then(() => {
      dispatch(setCurrentUser({}));
      dispatch(showOnlyPublicDocuments());
      setAuthorizationToken(false);
    });
};

export const signInAction = userInput =>
  dispatch => new Promise((resolve, reject) => {
    axios.post('/api/users/login/', userInput)
      .then((response) => {
        const { token } = response.data;
        const decoded =  jwt.decode(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        resolve({token, decoded});
      })
      .catch(error => reject(error.response.data.message));
});

