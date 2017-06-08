import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';


export default (ComposedComponent) => {
  /**
   * Higher order component
   * authenticate routes
   *
   * @class isAuthenticated
   * @extends {React.Component}
   */
  class isAuthenticated extends React.Component {
    constructor(props) {
      super(props);
    }

    /**
     *
     *
     *
     * @memberof isAuthenticated
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin');
        return (
          <Redirect
            to={{
              pathname: '/signin',
            }}
          />
        );
      }
    }

    /**
     *
     *
     * @param {any} nextProps
     *
     * @memberof isAuthenticated
     */
    componentWillUpdate(nextProps) {
      if (!this.props.isAuthenticated || !nextProps.isAuthenticated) {
        this.props.history.push('/signin');
        return (
          <Redirect
            to={{
              pathname: '/signin',
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

