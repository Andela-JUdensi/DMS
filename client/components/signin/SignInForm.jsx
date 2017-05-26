import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import FormTextFields from '../common/FormTextFields';
import { signInAction } from '../../actions/authentication.action';
import Alerts from '../common/alerts';
import styles from '../../assets/styles';

class SignInForm extends React.Component {
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

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.signInAction(this.state)
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch((errors) => {
        this.setState({ errors, isLoading: false });
      });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value, errors: '' });
  }

  render() {
    const { errors, isLoading, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className="mui-col-md-12 form-container">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <form onSubmit={this.onSubmit} style={styles.formStyle}>
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
              />
            </div>
            <div className="mui-col-md-12">
              <RaisedButton
                label="Signup"
                labelPosition="before"
                icon={<PersonAdd />}
                default
                type="submit"
                disabled={isLoading}
                fullWidth
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
