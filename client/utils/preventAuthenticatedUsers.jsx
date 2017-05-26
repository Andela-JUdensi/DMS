import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';


export default (ComposedComponent) => {
  /**
   * 
   * 
   * @class isAuthenticated
   * @extends {React.Component}
   */
  class isAuthenticated extends React.Component {

    /**
     * 
     * 
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
     * 
     * 
     * @param {any} nextProps 
     * @returns 
     * 
     * @memberof isAuthenticated
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
     * 
     * 
     * @returns 
     * 
     * @memberof isAuthenticated
     */
    render() {
      return (
        <ComposedComponent {...this.props} {...this.state} />
      );
    }
  }

  isAuthenticated.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  isAuthenticated.defaultProps = {
    isAuthenticated: false,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
  });

  return withRouter(connect(mapStateToProps)(isAuthenticated));
};

