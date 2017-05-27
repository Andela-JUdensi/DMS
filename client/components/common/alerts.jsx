import React from 'react';
import PropTypes from 'prop-types';

class Alerts extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        
      };
    }

    render() {
      return (
        <div>
          <p className="mui--text-center mui--text-dark">
            { this.props.success ? this.props.errors : ''}
          </p>
          <p className="mui--text-center mui--bg-primary">
            { this.props.errors ? this.props.errors : ''}
          </p>
        </div>
      );
    }
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
