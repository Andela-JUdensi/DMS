import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';


export default (ComposedComponent) => {
  
  /**
   * Higher order component
   * protects routes from signedin users
   * 
   * @class PreventAuthenticatedUsers
   * @extends {React.Component}
   */
  class PreventAuthenticatedUsers extends React.Component {

    /**
     * checks if user is authenticated before mounting
     * 
     * @memberof isAuthenticated
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push('/');
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: this.props.location }
            }}
          />
        );
      }
    }

    /**
     * checks if user is still authenticated after component update
     * 
     * @param {object} nextProps - new props after update
     * @returns {Object} - redirect object
     * 
     * @memberof PreventAuthenticatedUsers
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/');
        return (
          <Redirect
          to={{
            pathname: '/',
            state: { from: this.props.location }
          }}
          />
        );
      }
    }


    /**
     * renders component to DOM
     * 
     * @returns {Object}
     * 
     * @memberof isAuthenticated
     */
    render() {
      return (
        <ComposedComponent {...this.props} {...this.state} />
      );
    }
  }
  
  PreventAuthenticatedUsers.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };
  
  PreventAuthenticatedUsers.defaultProps = {
    isAuthenticated: false,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
  });

  return withRouter(connect(mapStateToProps)(PreventAuthenticatedUsers));
};

