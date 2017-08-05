import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm';

const SignUp = (props) => {
  return (
    <div className="mui-row">
      <div className="mui-col-md-offset-3 mui-col-md-6">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
