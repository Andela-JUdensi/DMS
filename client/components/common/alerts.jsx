import React from 'react';
import PropTypes from 'prop-types';

const Alerts = (props) => {
  return (
    <div>
      <p className="mui--text-center mui--text-dark alert-success">
        { props.success ? props.success : ''}
      </p>
      <p className="mui--text-center mui--bg-primary alert-error">
        { props.errors ? props.errors : ''}
      </p>
    </div>
  );
}

Alerts.propTypes = {
  errors: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired
};

Alerts.defaultProps = {
  errors: '',
  success: ''
};

export default Alerts;
