import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import HomeIcon from 'material-ui/svg-icons/action/home';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Book from 'material-ui/svg-icons/action/book';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

import NavigationMenu from './NavigationBar';
import { signOut } from '../../actions/authentication.action';


const style = {
  paper: {
    display: 'inline-block',
    width: '100%'
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  Avatar: {
    width: '70px',
    margin: '0 auto',
    position: 'relative',
    top: 0,
    bottom: '20px',
    height: '70px',
    fontSize: '50px',
    background: 'white'
  }
};

injectTapEventPlugin();

class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  toggleSideMenu() {
    this.setState({ open: !this.state.open });
  }

  signOut() {
    this.props.signOut();
  }

  render() {
    const { isAuthenticated } = this.props.state.authentication;
    let user = 'Guest';
    let userid = 0;
    if (isAuthenticated) {
      const { username, userID } = this.props.state.authentication.user;
      user = `${username}`;
      userid = userID;
    }

    const userLinks = (
      <Paper style={style.paper}>
        <Menu className="side-menu">
          <Link to="/"><MenuItem primaryText="Home" rightIcon={<HomeIcon />} /></Link>
          <Divider />
          <Link to="/members"><MenuItem primaryText="View Users" rightIcon={<Book />} /></Link>
          <Divider />
          <Link to="/new-document">
            <MenuItem primaryText="New Document" rightIcon={<FileUpload />} />
          </Link>
          <MenuItem primaryText="Make a copy" rightIcon={<ContentCopy />} />
          <Divider />
          <MenuItem primaryText="Sign out" onTouchTap={this.signOut} rightIcon={<ContentLink />} />
        </Menu>
      </Paper>
    );

    const guestLinks = (
      <Paper style={style.paper}>
        <Menu className="side-menu">
          <Link to="/"><MenuItem primaryText="Home" rightIcon={<HomeIcon />} /></Link>
          <Link to="/signup"><MenuItem primaryText="Sign Up" rightIcon={<PersonAddIcon />} /></Link>
          <Link to="/signin"><MenuItem primaryText="Sign In" rightIcon={<PersonAddIcon />} /></Link>
        </Menu>
      </Paper>
    );

    return (
      <div>
        <NavigationMenu
          toggleSideMenu={this.toggleSideMenu}
          isAuthenticated={isAuthenticated}
          signOut={this.signOut}
        />
        <Drawer
          width={280}
          openPrimary
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar
            title="Hermes"
            onTouchTap={this.toggleSideMenu}
            className="drawerHeader"
          />
          <Link to={`/profile/${userid}`}>
            <ListItem
              disabled
              leftAvatar={<Avatar style={style.Avatar}>{ user.charAt(0) }</Avatar>}
              className="drawerUsername"
            />
          </Link>
          { isAuthenticated ? userLinks : guestLinks }
        </Drawer>
      </div>
    );
  }
}

SideMenu.propTypes = {
  state: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  state,
});

export default withRouter(connect(mapStateToProps, { signOut })(SideMenu));
