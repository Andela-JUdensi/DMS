import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Snackbar from 'material-ui/Snackbar';
import {
  Redirect,
  withRouter,
} from 'react-router-dom';
import FormElements from '../common/FormTextFields';
import signUpAction from '../../actions/signUp.action';
import Alerts from '../common/Alerts';
import styles from '../../assets/styles';
import Validator from '../../shared/validator';

/**
 * 
 * 
 * @class SignUpForm
 * @extends {React.Component}
 */
class SignUpForm extends React.Component {
  /**
   * Creates an instance of SignUpForm.
   * @param {object} props - component properties
   * 
   * @memberof SignUpForm
   */
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: '',
      isLoading: false,
      redirect: false,
      snackBarOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * calls signUpAction
   * 
   * @param {any} event - submit event
   * @returns {Object} - setState
   * 
   * @memberof SignUpForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: '',
      isLoading: true,
    });

    if ((Validator.validateSignup(this.state)) !== undefined) {
     return this.setState({
       errors: Validator.validateSignup(this.state),
       isLoading: false
      }); 
    }

    this.props.signUpAction(this.state)
      .then(() => {
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: '',
          passwordConfirmation: '',
          errors: '',
          isLoading: false,
          snackBarOpen: true
        });

        setTimeout(() => {
          this.props.history.push('/signin');
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: this.props.location }
            }}
          />;
        },
          2000
        );
      })
      .catch((errors) => {
        this.setState({ errors, isLoading: false });
      });
  }

  /**
   * set state for user inputs
   * 
   * @param {object} event - change event
   * 
   * @memberof SignUpForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value, errors: '' });
  }

  /**
   * renders component to DOM
   * 
   * @returns {object}
   * 
   * @memberof SignUpForm
   */
  render() {
    const { isLoading } = this.state;
    return (
      <div className="mui-col-md-12 form-container">
        <MuiThemeProvider>
          <form
            onSubmit={this.onSubmit}
            style={styles.formStyle}
            className="signup-form"
          >
            <h1>Join Hermes</h1>
            <Alerts errors={this.state.errors} />
            <div className="mui-col-md-6">
              <FormElements
                field="firstname"
                value={this.state.firstname}
                label="Firstname"
                type="text"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="mui-col-md-6">
              <FormElements
                field="lastname"
                value={this.state.lastname}
                label="Lastname"
                type="text"
                onChange={this.onChange}
                required
              />
            </div>

            <div className="mui-col-md-6">
              <FormElements
                field="email"
                value={this.state.email}
                label="Email"
                type="text"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="mui-col-md-6">
              <FormElements
                field="username"
                value={this.state.username}
                label="Username"
                type="text"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="mui-col-md-6">
              <FormElements
                field="password"
                value={this.state.password}
                label="Password"
                type="password"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="mui-col-md-6">
              <FormElements
                field="passwordConfirmation"
                value={this.state.passwordConfirmation}
                label="Confirm password"
                type="password"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="mui-col-md-12">
              <RaisedButton
                label="Signup"
                labelPosition="before"
                default
                icon={<PersonAdd />}
                type="submit"
                disabled={isLoading}
                className="submit-signup"
                fullWidth
              />
            </div>
            <Snackbar
              open={this.state.snackBarOpen}
              message="Signup success"
              autoHideDuration={10000}
            />
          </form>
        </MuiThemeProvider>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  signUpAction: PropTypes.func.isRequired,
};

export default withRouter(connect(null, {
  signUpAction
})(SignUpForm));

export { SignUpForm };
