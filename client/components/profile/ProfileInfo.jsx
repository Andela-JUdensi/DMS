import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helpers from '../../utils/Helpers';
import { getUserAction, deleteUserAction } from '../../actions/users.action';
import styles from '../../assets/styles';


/**
 * 
 * 
 * @class ProfileInfo
 * @extends {React.Component}
 */
class ProfileInfo extends React.Component {

  /**
   * Creates an instance of ProfileInfo.
   * @param {any} props 
   * 
   * @memberof ProfileInfo
   */
  constructor(props) {
    super(props);
    this.props.getUserAction(this.props.match.params.id);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(userID) {
    this.props.deleteUserAction(userID);
  }


  /**
   * 
   * 
   * @returns 
   * 
   * @memberof ProfileInfo
   */
  render() {
    const {
      username,
      firstname,
      lastname,
      email,
      roleID,
      createdAt,
    } = this.props.user;

    return (
      <div>
        {
          username
          ?
            <div className="user-profile-wrapper">
              <ListItem
                disabled
                leftAvatar={
                  <Avatar style={styles.Avatar}>
                    { username ? username.charAt(0) : '' }
                  </Avatar>}
                className="profile-avatar-username mui-col-md-6"
              />
              <div className="profile-user-info mui-col-md-6">
                <h3>
                  {username}
                </h3>
                <p>
                  <span>Firstname:</span> {firstname}
                </p>
                <p>
                  <span>Lastname:</span> {lastname}
                </p>
                <p>
                  <span>Email:</span> {email}
                </p>
                <p>
                  <span>Role:</span> {Helpers.getRoleName(roleID)}
                </p>
                <p>
                  <span>Joined: </span>{Helpers.readDate(createdAt)}
                </p>
              </div>
              {
                this.props.stateUser.roleID === 1
                || this.props.user.roleID === this.props.stateUser.roleID
                ?
                  <div className="profile-delete-button mui--pull-right">
                    <RaisedButton
                      label="Delete user"
                      labelPosition="before"
                      style={styles.deleteButton}
                      containerElement="label"
                      secondary
                      icon={<DeleteIcon />}
                      onTouchTap={() => this.deleteUser(this.props.user.id)}
                      className="delete-profile-button"
                    />
                  </div>
                :
                  ''
              }
            </div>
          :
            <MuiThemeProvider>
              <div>
                <h1>404: No user found</h1>
                <CircularProgress size={60} thickness={7} />
              </div>
            </MuiThemeProvider>
        }
      </div>
    );
  }
}

ProfileInfo.propTypes = {
  stateUser: PropTypes.any,
  user: PropTypes.any,
  getUserAction: PropTypes.func,
  match: PropTypes.object,
};

ProfileInfo.defaultProps = {
  user: {},
  stateUser: {},
  match: {},
  getUserAction: () => {},
};

const mapStateToProps = state => ({
  stateUser: state.authentication.user,
  user: state.user,
});


export default withRouter(
  connect(mapStateToProps, {
    getUserAction,
    deleteUserAction
  })(ProfileInfo));

export { ProfileInfo };
