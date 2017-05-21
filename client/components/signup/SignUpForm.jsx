import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Snackbar from 'material-ui/Snackbar';
import {
  Redirect,
  withRouter,
} from 'react-router-dom';

import FormElements from '../common/FormTextFields';
import signUpAction from '../../actions/signUp.action';

const styles = {
  formStyle: {
    margin: 15,
  },
  button: {
    margin: 1,
    width: '',
    display: 'inline-block',
    position: 'relative',
  },
  formElement: {
    margin: 5,
  },
};

class SignUpForm extends React.Component {

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

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      isLoading: true,
    });
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
      .catch((error) => {
        this.setState({ errors: error, isLoading: false });
      });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { isLoading, errors } = this.state;
    return (
      <div className="mui-col-md-12 form-container">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <form onSubmit={this.onSubmit} style={styles.formStyle}>
            <h1>Join Hermes</h1>
            {(errors) ? <p> {errors.message} </p> : ''}
            <div className="mui-col-md-6">
              <FormElements
                field="firstname"
                value={this.state.firstname}
                label="Firstname"
                type="text"
                onChange={this.onChange}
              />
            </div>
            <div className="mui-col-md-6">
              <FormElements
                field="lastname"
                value={this.state.lastname}
                label="Lastname"
                type="text"
                onChange={this.onChange}
              />
            </div>

            <div className="mui-col-md-6">
              <FormElements
                field="email"
                value={this.state.email}
                label="Email"
                type="text"
                onChange={this.onChange}
              />
            </div>
            <div className="mui-col-md-6">
              <FormElements
                field="username"
                value={this.state.username}
                label="Username"
                type="text"
                onChange={this.onChange}
              />
            </div>
            <div className="mui-col-md-6">
              <FormElements
                field="password"
                value={this.state.password}
                label="Password"
                type="password"
                onChange={this.onChange}
              />
            </div>
            <div className="mui-col-md-6">
              <FormElements
                field="passwordConfirmation"
                value={this.state.passwordConfirmation}
                label="Confirm password"
                type="password"
                onChange={this.onChange}
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
  // addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(connect(null, { signUpAction })(SignUpForm));
