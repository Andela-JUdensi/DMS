import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LockIcon from 'material-ui/svg-icons/action/lock';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Snackbar from 'material-ui/Snackbar';
import RoleIcon from 'material-ui/svg-icons/action/group-work';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import FormElements from '../common/FormTextFields';
import styles from '../../assets/styles';

/**
 * render update profile form
 * @param {object} props 
 */
const ProfileForm = props => (
  <div className="mui-col-md-12 edit-profile-container">
    <MuiThemeProvider>
      <form onSubmit={(event) => props.onSubmit(event)}
        className="profile-update-form" style={styles.formStyle}>

        <h1 id="updateProfile">Update Profile</h1>
        {(props.errors) ? <p> {props.errors} </p> : ''}
        <div className="mui-col-md-6">
          <FormElements
            field="firstname"
            value={props.firstname}
            label="Firstname"
            onChange={props.onChange}
            id="form-firstname"
          />
        </div>
        <div className="mui-col-md-6">
          <FormElements
            field="lastname"
            value={props.lastname}
            label="Lastname"
            onChange={props.onChange}
            id="form-lastname"
          />
        </div>

        <div className="mui-col-md-6">
          <FormElements
            field="email"
            value={props.email}
            label="Email"
            onChange={props.onChange}
            id="form-email"
          />
        </div>
        <div className="mui-col-md-6">
          <FormElements
            field="username"
            value={props.username}
            label="Username"
            type="text"
            onChange={props.onChange}
            id="form-username"
          />
        </div>
        <div className="mui-col-md-6">
          <FormElements
            field="password"
            value={props.password}
            label="Password"
            type="password"
            fullWidth
            onChange={props.onChange}
            id="form-password"
          />
        </div>
        <div className="mui-col-md-6">
          <SelectField
            floatingLabelText="Priviledge"
            value={props.roleId}
            name="roleId"
            type="select"
            onChange={props.handleChange}
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
            disabled={props.isLoading}
            fullWidth
            className="button"
            id="update-profile"
            type="submit"
          />
        </div>
        <Snackbar
          open={props.snackBarOpen}
          message="Profile has been updated"
          autoHideDuration={10000}
        />
      </form>
    </MuiThemeProvider>
  </div>
);

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  snackBarOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  errors: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  roleId: PropTypes.any
};

ProfileForm.defaultProps = {
  snackBarOpen: false,
  isLoading: false,
};

export default ProfileForm;
