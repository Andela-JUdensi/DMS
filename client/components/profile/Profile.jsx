import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfileTabs from './ProfileTabs';

/**
 * Profile component
 * 
 * @return {object} - Profile component
 */
const Profile = () => (
  <div className="mui-col-md-offset-2 mui-col-md-8 profile-container mui--text-light-secondary">
    <MuiThemeProvider>
      <ProfileTabs />
    </MuiThemeProvider>
  </div>
);


export default Profile;
