import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


/**
 *
 * @param ComposedComponent
 * @returns {Object}
 */
export default (ComposedComponent) => {
  
  /**
   *
   */
  class isAuthenticated extends React.Component {
  
    /**
     *
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin');
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: this.props.location }
          }}
        />;
      }
    }
  
    /**
     *
     * @param nextProps - next props after component update
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/signin');
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: this.props.location }
          }}
        />;
      }
    }
  
    /**
     *
     * @returns {XML}
     */
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

