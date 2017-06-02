import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import EditProfile from './EditProfileForm';
import UserInfo from './ProfileInfo';
import UserDocs from './UserDocuments';

/**
 * render user profile tabs
 * 
 * @class ProfileTabs
 * @extends {React.Component}
 */
class ProfileTabs extends React.Component {

  /**
   * Creates an instance of ProfileTabs.
   * @param {any} props 
   * 
   * @memberof ProfileTabs
   */
  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.setUserName = this.setUserName.bind(this);
  }

  /**
   * 
   * 
   * @param {string} username 
   * 
   * @memberof ProfileTabs
   */
  setUserName(username) {
    this.setState({ username });
  }

  /**
   * 
   * 
   * @returns {Object}
   * 
   * @memberof ProfileTabs
   */
  render() {
    return (
      <Tabs className="profile-tabs">
        <Tab label="User">
          <UserInfo setUsername={username => this.setUserName(username)} />
        </Tab>
        {
          parseInt(this.props.stateUser.userId, 10) === parseInt(this.props.match.params.id, 10)
          || this.props.stateUser.roleId === 1
            ?
              <Tab label="Preference">
                <EditProfile />
              </Tab>
            :
              ''
        }
      </Tabs>
    );
  }
}


ProfileTabs.propTypes = {
  stateUser: PropTypes.any,
  match: PropTypes.object.isRequired,
};

ProfileTabs.defaultProps = {
  user: {},
  stateUser: {},
  match: {},
};

const mapStateToProps = state => ({
  user: state.user,
  stateUser: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(ProfileTabs));
