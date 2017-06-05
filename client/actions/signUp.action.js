import axios from 'axios';

/**
 * api post request saving user details
 * @param {object} userDetails - user information
 */
const signUpAction = userDetails => dispatch =>
  new Promise((resolve, reject) => {
    axios.post('/api/users/', userDetails)
      .then((response) => {
        resolve(response);
      })
      .catch(error => reject(error.response.data.message));
  });

export default signUpAction;
