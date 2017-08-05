import axios from 'axios';

/**
 * 
 * @param {string} token - jwt authorization token
 */
const setAuthorizationToken = (token) => {
  const axiosCalls = axios.create();
  const defaultHeaders = axiosCalls.defaults.headers.common || {};

  if (token) {
    defaultHeaders.authorization = `Bearer ${token}`;
  } else {
    delete defaultHeaders.authorization;
  }
};

export default setAuthorizationToken;
