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
import Alerts from '../common/alerts';


/**
 * displays user profile
 * 
 * @class ProfileInfo
 * @extends {React.Component}
 */
class ProfileInfo extends React.Component {

  /**
   * Creates an instance of ProfileInfo.
   * @param {object} props 
   * 
   * @memberof ProfileInfo
   */
  constructor(props) {
    super(props);

    this.state = {
      errors: ''
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (this.props.location.state.id !== nextProps.location.state.id) {
      this.props.getUserAction(nextProps.location.state.id);
    }
  }

  /**
   * 
   * call getUserAction
   * before component mounts
   * 
   * @memberof ProfileInfo
   */
  componentDidMount() {
    this.props.getUserAction(this.props.location.state.id);
  }

  /**
   * call deleteUserAction
   * 
   * 
   * @param {integer} userId 
   * 
   * @memberof ProfileInfo
   */
  deleteUser(userId) {
    this.props.deleteUserAction(userId)
      .then((success) => {
      })
      .catch((error) => {
        this.setState({ errors:  error.message });
      });
  }


  /**
   * 
   * 
   * @returns {Object}
   * 
   * @memberof ProfileInfo
   */
  render() {
    const {
      username,
      firstname,
      lastname,
      email,
      roleId,
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
                  <span>Role:</span> {Helpers.getRoleName(roleId)}
                </p>
                <p>
                  <span>Joined: </span>{Helpers.readDate(createdAt)}
                </p>
              </div>
              {
                (this.props.stateUser.roleId === 1
                || this.props.location.state.id === this.props.stateUser.userId)
                ?
                  <div className="profile-delete-button mui--pull-right">
                    <Alerts errors={this.state.errors} />
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

/**
 * 
 * @param {object} state - redux state 
 */
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
