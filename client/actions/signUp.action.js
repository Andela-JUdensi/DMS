import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const signUpAction = userData => dispatch => new Promise((resolve, reject) => {
  axios.post('/api/users/', userData)
    .then((response) => {
      resolve(response);
    })
    .catch(error => reject(error));
});

export default signUpAction;
