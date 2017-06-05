import React from 'react';
import PropTypes from 'prop-types';
import SignInForm from './SignInForm';

const SignIn = (props) => {
  return (
    <div className="mui-row">
      <div className="mui-col-md-offset-3 mui-col-md-6">
        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
