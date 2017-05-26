import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../assets/app.scss';
import AppMenu from './menu/Index';

injectTapEventPlugin();

const App = props => (
  <div>
    <AppMenu />
    { props.children }
  </div>
);

App.propTypes = {
  children: PropTypes.array
};


App.defaultProps = {
  children: []
};

export default App;
