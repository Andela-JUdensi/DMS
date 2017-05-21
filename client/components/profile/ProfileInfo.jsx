import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import Helpers from '../../utils/Helpers';
import { getUserAction, userDocumentsAction } from '../../actions/users.action';


const styles = {
  tab: {
    background: 'rgba(255, 255, 255, .1)'
  },
  headline: {
    fontSize: 24,
    fontWeight: 400,
    background: 'rgba(0, 0, 0, 1)'
  },
  deleteButton: {
    backgroundColor: 'crimson'
  },
  Avatar: {
    width: '200px',
    height: '200px',
    position: 'relative',
    top: 0,
    fontSize: '100px',
    background: 'white'
  }
};

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserAction(this.props.match.params.id);
  }
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
        <ListItem
          disabled
          leftAvatar={<Avatar style={styles.Avatar}>{ username ? username.charAt(0) : '' }</Avatar>}
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
              />
            </div>
          :
            ''
        }
      </div>
    );
  }
}

ProfileInfo.propTypes = {
  stateUser: PropTypes.object.isRequired,
  user: PropTypes.any.isRequired,
  getUserAction: PropTypes.func.isRequired,
  userDocumentsAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  stateUser: state.authentication.user,
  user: state.user,
});


export default withRouter(connect(mapStateToProps, { getUserAction, userDocumentsAction })(ProfileInfo));
