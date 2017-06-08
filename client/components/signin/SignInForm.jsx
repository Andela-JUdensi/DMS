import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import PersonIcon from 'material-ui/svg-icons/social/person';
import FormTextFields from '../common/FormTextFields';
import { signInAction } from '../../actions/authentication.action';
import Alerts from '../common/alerts';
import styles from '../../assets/styles';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import Helpers from '../../utils/Helpers';

/**
 * render signin form
 * 
 * @class SignInForm
 * @extends {React.Component}
 */
class SignInForm extends React.Component {

  /**
   * Creates an instance of SignInForm.
   * @param {object} props 
   * 
   * @memberof SignInForm
   */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: '',
      isLoading: false,
      redirect: false,
    };
  
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * 
   * submit sigin form details
   * @param {object} event 
   * 
   * @memberof SignInForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.signInAction(this.state)
      .then((response) => {
        Helpers.saveToLocalStorage(
          response.token,
          response.decoded.userId,
          response.decoded.roleId
        );
        setAuthorizationToken(response.token);
        this.setState({ redirect: true });
      })
      .catch((errors) => {
        this.setState({ errors, isLoading: false });
      });
  }

  /**
   * 
   * update state change
   * @param {object} event 
   * 
   * @memberof SignInForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value, errors: '' });
  }

  /**
   * 
   * 
   * @returns {Object}
   * 
   * @memberof SignInForm
   */
  render() {
    const { errors, isLoading, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to="/dashboard" />
      );
    }
    return (
      <div className="mui-col-md-12 form-container">
        <MuiThemeProvider>
          <form
            onSubmit={this.onSubmit}
            style={styles.formStyle}
            className="signin-form"
          >
            <h1><center>Sign in</center></h1>
            <Alerts errors={this.state.errors} />
            <div className="mui-col-md-6">
              <FormTextFields
                field="identifier"
                value={this.state.identifier}
                label="Username or Email"
                type="text"
                id="input-identifier"
                fullWidth
                onChange={this.onChange}
                required
              />
            </div>
            <div className="mui-col-md-6">
              <FormTextFields
                field="password"
                value={this.state.password}
                label="Password"
                type="password"
                id="input-password"
                fullWidth
                onChange={this.onChange}
                required
              />
            </div>
            <div className="mui-col-md-12">
              <RaisedButton
                label="Signin"
                labelPosition="before"
                icon={<PersonIcon />}
                default
                type="submit"
                disabled={isLoading}
                fullWidth
                className="submit-login"
              />
            </div>
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

SignInForm.propTypes = {
  signInAction: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { signInAction })(SignInForm));
