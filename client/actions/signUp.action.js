import axios from 'axios';

const signUpAction = userData => dispatch => new Promise((resolve, reject) => {
  axios.post('/api/users/', userData)
    .then((response) => {
      resolve(response);
    })
    .catch(error => reject(error.response.data.message));
});

export default signUpAction;
