import axios from 'axios';

const setAuthorizationToken = (token) => {
  const axiosCalls = axios.create();
  const defaultHeaders = axiosCalls.defaults.headers.common = {};

  if (token) {
    defaultHeaders.authorization = `Bearer ${token}`;
  } else {
    delete defaultHeaders.authorization;
  }
};

export default setAuthorizationToken;
