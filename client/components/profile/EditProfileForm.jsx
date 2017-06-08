import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lodash from 'lodash';
import {
  withRouter,
} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import { updateUserAction, getUserAction } from '../../actions/users.action';
import styles from '../../assets/styles';
import ProfileForm from './ProfileForm';
import Validator from '../../shared/validator';

/**
 * 
 * 
 * @class EditProfileForm
 * @extends {React.Component}
 */
class EditProfileForm extends React.Component {
  /**
   * Creates an instance of EditProfileForm.
   * @param {object} props 
   * 
   * @memberof EditProfileForm
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      isLoading: false,
      redirect: false,
      snackBarOpen: false,
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      roleId: '',
      userId: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * 
   * update state user role on change
   * @param {object} event 
   * @param {integer} index 
   * @param {integer} roleId 
   * 
   * @memberof EditProfileForm
   */
  handleChange(event, index, roleId) {
    this.setState({ roleId });
  }

  /**
   * 
   * determine if component will mount
   * set state properties before component mounts
   * @memberof EditProfileForm
   */
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        firstname: this.props.user.firstname,
        lastname: this.props.user.lastname,
        email: this.props.user.email,
        username: this.props.user.username,
        roleId: this.props.user.roleId,
        userId: this.props.user.id,
      });
    }, 500);
  }

  /**
   * call update user action
   * update user information
   * 
   * @param {object} event 
   * 
   * @memberof EditProfileForm
   */
  onSubmit(event) {
    event.preventDefault();

    if (Validator.validateUserUpdate(this.state) !== true) {
      return this.setState({ errors: Validator.validateUserUpdate(this.state)});
    }

    this.setState({
      errors: '',
      isLoading: true,
    });

    let selectedUserInfo = lodash.pickBy(this.state, lodash.identity);

    selectedUserInfo = lodash.omit(selectedUserInfo, ['userId']);

    this.props.updateUserAction(this.props.location.state.id, selectedUserInfo)
      .then((response) => {
        this.setState({
          errors: '',
          isLoading: false,
          snackBarOpen: true
        }, () => this.props.getUserAction(this.state.userId));
        setTimeout(() => this.setState({ snackBarOpen: false }), 3000);
      })
      .catch((error) => {
        this.setState({ errors: error, isLoading: false });
      });
  }

  /**
   * set state change of user properties
   * 
   * @param {object} event 
   * 
   * @memberof EditProfileForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * 
   * 
   * @returns {Object}
   * 
   * @memberof EditProfileForm
   */
  render() {
    if (this.props.user.username) {
      return (
        <ProfileForm
          snackBarOpen={this.state.snackBarOpen}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          handleChange={this.handleChange}
          isLoading={this.state.isLoading}
          errors={this.state.errors}
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          username={this.state.username}
          email={this.state.email}
          password={this.state.password}
          roleId={this.state.roleId}
        />
      );
    }
    return (
      <MuiThemeProvider>
        <CircularProgress size={60} thickness={7} />
      </MuiThemeProvider>
    );
  }
}

EditProfileForm.propTypes = {
  updateUserAction: PropTypes.func.isRequired,
  getUserAction: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired,
};

EditProfileForm.defaultProps = {
  updateUserAction: () => {},
  getUserAction: () => {},
  user: {},
};

/**
 * 
 * @param {object} state - redux state 
 */
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    updateUserAction, getUserAction
  })(EditProfileForm));

export { EditProfileForm };
