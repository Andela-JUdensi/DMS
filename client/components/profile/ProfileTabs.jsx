import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import EditProfile from './EditProfileForm';
import UserInfo from './ProfileInfo';

/**
 * ProfileTabs component
 * 
 * @param {object} props - component properties
 */
const ProfileTabs = (props) => {
  return (
    <Tabs className="profile-tabs">
      <Tab label="User">
        <UserInfo />
      </Tab>
      {
        parseInt(props.stateUser.userId, 10) 
          === parseInt(props.location.state.id, 10)
        || props.stateUser.roleId === 1
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

ProfileTabs.propTypes = {
  stateUser: PropTypes.any,
  location: PropTypes.object.isRequired,
};

ProfileTabs.defaultProps = {
  stateUser: {},
  location: {},
};

const mapStateToProps = state => ({
  stateUser: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(ProfileTabs));

export { ProfileTabs }

