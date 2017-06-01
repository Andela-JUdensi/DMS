import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBox from '../search/SearchBox';
import styles from '../../assets/styles';

/**
 * render top navigation bar
 * @param {object} props 
 */
const NavigationBar = (props) => {
  const { isAuthenticated } = props;
  const userLinks = (
    <ToolbarGroup>
      <ToolbarTitle />
      <ToolbarSeparator />
      <Link to="/">
        <RaisedButton label="Home" default className="button" />
      </Link>
      <ToolbarSeparator />
      <Link to="/dashboard">
        <RaisedButton label="Dashboard" default className="button" />
      </Link>
      <ToolbarSeparator />
      <RaisedButton label="Sign out" default onTouchTap={props.signOut} />
    </ToolbarGroup>
  );
  const guestLinks = (
    <ToolbarGroup>
      <ToolbarTitle />
      <ToolbarSeparator />
      <Link to="/">
        <RaisedButton label="Home" default />
      </Link>
      <ToolbarSeparator />
      <Link to="/signin">
        <RaisedButton label="Sign in" default />
      </Link>
      <ToolbarSeparator />
      <Link to="/signup">
        <RaisedButton label="Sign up" default />
      </Link>
    </ToolbarGroup>
    );

  return (
    <AppBar
      title="Hermes"
      onLeftIconButtonTouchTap={props.toggleSideMenu}
      className="top-nav-bar"
    >
      <Toolbar noGutter={false} style={styles.toolbar}>
        { isAuthenticated ? userLinks : guestLinks }
      </Toolbar>
    </AppBar>
  );
}

NavigationBar.apply.propTypes = {
  toggleSideMenu: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default NavigationBar;
