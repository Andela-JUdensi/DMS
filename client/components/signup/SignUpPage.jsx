import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm';

class SignUp extends React.Component {
  render() {
    return (
      <div className="mui-row">
        <div className="mui-col-md-offset-3 mui-col-md-6">
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default SignUp;
