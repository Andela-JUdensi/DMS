
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';


export default (ComposedComponent) => {
  class isAuthenticated extends React.Component {
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push('/');
        <Redirect
          to={{
            pathname: '/',
            state: { from: this.props.location }
          }}
        />;
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
        <Redirect
          to={{
            pathname: '/',
            state: { from: this.props.location }
          }}
        />;
      }
    }

    render() {
      return (
        <ComposedComponent />
      );
    }
  }

  isAuthenticated.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  isAuthenticated.defaultProps = {
    isAuthenticated: false,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
  });

  return withRouter(connect(mapStateToProps)(isAuthenticated));
};

