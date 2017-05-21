import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import EditProfileForm from './EditProfileForm';
import ProfileInfo from './ProfileInfo';
import UserDocuments from './UserDocuments';

class profileTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.setUserName = this.setUserName.bind(this);
  }

  setUserName(username) {
    this.setState({ username });
  }

  render() {
    return (
      <Tabs className="profile-tabs">
        <Tab label="User">
          <ProfileInfo setUsername={username => this.setUserName(username)} />
        </Tab>
        <Tab label="Documents">
          <UserDocuments />
        </Tab>
        {
          this.props.stateUser.userID === this.props.user.id
          || this.props.stateUser.roleID === 1
            ?
              <Tab label="Preference">
                <EditProfileForm />
              </Tab>
            :
              ''
        }
      </Tabs>
    );
  }
}


profileTabs.propTypes = {
  user: PropTypes.any.isRequired,
  stateUser: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  stateUser: state.authentication.user
});

export default withRouter(connect(mapStateToProps)(profileTabs));
