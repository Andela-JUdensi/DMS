import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ProfileTabs from './ProfileTabs';

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mui-col-md-offset-2 mui-col-md-8 profile-container mui--text-light-secondary">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <ProfileTabs />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Profile;
