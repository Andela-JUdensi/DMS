import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
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
import styles from '../../assets/styles';

/**
 * render side drawer menu
 * @class SideMenu
 * @extends {React.Component}
 */
class SideMenu extends React.Component {
  /**
   * Creates an instance of SideMenu.
   * @param {object} props 
   * @memberof SideMenu
   */
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  /**
   * toggles side drawer menu open/close
   * @memberof SideMenu
   */
  toggleSideMenu() {
    this.setState({ open: !this.state.open });
  }

  /**
   * call signout dispatch action
   * @memberof SideMenu
   */
  signOut() {
    this.props.signOut();
  }

  /**
   * renders sider menu drawer to dom
   * 
   * @returns {Object}
   * 
   * @memberof SideMenu
   */
  render() {
    const { isAuthenticated } = this.props.state.authentication;
    let user = 'Guest';
    let currentUserId;
    if (isAuthenticated) {
      let { username, userId } = this.props.state.authentication.user;
      user = `${username}`;
      currentUserId = userId;
    }

    const userLinks = (
      <Paper style={styles.paper}>
        <Menu className="side-menu">
          <Link to="/"><MenuItem primaryText="Home" rightIcon={<HomeIcon />} /></Link>
          <Divider />
          <Link to="/members" className="view-users-link"><MenuItem primaryText="View Users" rightIcon={<Book />} /></Link>
          <Divider />
          <Link to="/new-document" className="new-document-link">
            <MenuItem primaryText="New Document" rightIcon={<FileUpload />} />
          </Link>
          <Divider />
          <MenuItem primaryText="Sign out" onTouchTap={this.signOut} rightIcon={<ContentLink />} />
        </Menu>
      </Paper>
    );

    const guestLinks = (
      <Paper style={styles.paper}>
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
          <Link to={{
            pathname: '/profile',
            state: { id: currentUserId }
          }} >
            <ListItem
              disabled
              leftAvatar={<Avatar style={styles.sideAvatar}>{ user.charAt(0) }</Avatar>}
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

/**
 * 
 * @param {object} state -redux state
 */

const mapStateToProps = state => ({
  state,
});

export default withRouter(connect(mapStateToProps, { signOut })(SideMenu));
