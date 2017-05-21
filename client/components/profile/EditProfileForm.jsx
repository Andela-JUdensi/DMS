import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Snackbar from 'material-ui/Snackbar';
import lodash from 'lodash';
import {
  withRouter,
} from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LockIcon from 'material-ui/svg-icons/action/lock';
import RoleIcon from 'material-ui/svg-icons/action/group-work';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import CircularProgress from 'material-ui/CircularProgress';
import FormElements from '../common/FormTextFields';
import { updateUserAction, getUserAction } from '../../actions/users.action';

const styles = {
  formStyle: {
    margin: 15,
    color: 'white',
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


class EditProfileForm extends React.Component {
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
      roleID: '',
      userID: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, roleID) {
    this.setState({ roleID });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        firstname: this.props.user.firstname,
        lastname: this.props.user.lastname,
        email: this.props.user.email,
        username: this.props.user.username,
        roleID: this.props.user.roleID,
        userID: this.props.user.id,
      });
    }, 1000);
  }


  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {},
      isLoading: true,
    });

    const selectedUserInfo = lodash(this.state).omitBy(lodash.isEmpty).omitBy(lodash.isNull).value();
    this.props.updateUserAction(this.state.userID, selectedUserInfo)
      .then(() => {
        this.setState({
          errors: '',
          isLoading: false,
          snackBarOpen: true
        });
        this.props.getUserAction(this.state.userID);
      })
      .catch((error) => {
        this.setState({ errors: error, isLoading: false });
      });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  render() {
    const { errors, isLoading } = this.state;
    if (this.props.user.username) {
      return (
        <div className="mui-col-md-12 edit-profile-container">
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <form style={styles.formStyle}>
              <h1>Update Profile</h1>
              {(errors) ? <p> {errors.message} </p> : ''}
              <div className="mui-col-md-6">
                <FormElements
                  field="firstname"
                  value={this.state.firstname}
                  label="Firstname"
                  onChange={this.onChange}
                />
              </div>
              <div className="mui-col-md-6">
                <FormElements
                  field="lastname"
                  value={this.state.lastname}
                  label="Lastname"
                  onChange={this.onChange}
                />
              </div>

              <div className="mui-col-md-6">
                <FormElements
                  field="email"
                  value={this.state.email}
                  label="Email"
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
                  value=""
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={this.onChange}
                />
              </div>
              <div className="mui-col-md-6">
                <SelectField
                  floatingLabelText="Priviledge"
                  value={this.state.roleID}
                  name="userRole"
                  type="select"
                  onChange={this.handleChange}
                  className="profile-select-role"
                >
                  <MenuItem value={1} primaryText="Superadmin" rightIcon={<LockIcon />} />
                  <MenuItem value={2} primaryText="Admin" rightIcon={<RoleIcon />} />
                  <MenuItem value={3} primaryText="Regular" rightIcon={<AccessibilityIcon />} />
                </SelectField>
              </div>
              <div className="mui-col-md-12">
                <RaisedButton
                  label="Update profile"
                  labelPosition="before"
                  default
                  icon={<PersonAdd />}
                  style={styles.button}
                  disabled={isLoading}
                  fullWidth
                  className="button"
                  onClick={this.onSubmit}
                />
              </div>
              <Snackbar
                open={this.state.snackBarOpen}
                message="Profile has been updated"
                autoHideDuration={10000}
              />
            </form>
          </MuiThemeProvider>
        </div>
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
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, { updateUserAction, getUserAction })(EditProfileForm));
