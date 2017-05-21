import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import scss from '../assets/app.scss';
import AppMenu from './menu/Index';

class App extends React.Component {
  render() {
    return (
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <AppMenu />
        { this.props.children }
      </CSSTransitionGroup>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App;
