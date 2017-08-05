import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import store from './store/configureStore';
import { setCurrentUser } from './actions/authentication.action';
import routes from './routes';
import App from './components/App';
import Footer from './components/footer/Footer';
import { setAuthorizationToken } from './Helpers/';

OfflinePluginRuntime.install();

(function setTokenInHeaders() {
  if (localStorage.hermesToken) {
    setAuthorizationToken(
      localStorage.hermesToken
    );
    store.dispatch(setCurrentUser(
      jwt.decode(localStorage.hermesToken)
    ));
  }
}());

render(
  <Provider store={store}>
    <Router>
      <div>
        <App />
        <div className="mui-container-fluid">
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>, document.querySelector('#app'));
