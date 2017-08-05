import React from 'react';
import {
  Link
} from 'react-router-dom';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import ReactTooltip from 'react-tooltip';
import DocumentOptions from './DocumentOptions';
import { Utilities } from '../../Helpers';
import styles from '../../assets/styles';

/**
 * maps through documents array
 * display documents in custom cards
 * @param {*} document - each document in array
 * @param {*} index - index of each document
 */
const documentStack = (document, index) => (
  <div key={document.id} >
    {
      index < 100
      ?
        <div className="mui-col-md-3 document-stack">
          <ReactTooltip />
          <DocumentOptions documentToView={document} />
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Paper style={styles.documentStack} zDepth={3}>
              <div className="mui-col-md-12 each-document-in-stack">
                <div className="each-document-in-stack-topbar">
                  <span className="pull-left">
                    {document.access}
                  </span>
                  <span className="pull-right">
                    {Utilities.readDate(document.createdAt)}
                  </span>
                </div>
                <div className="each-document-in-stack-title">
                  <h4 data-tip={document.title}>
                    {(document.title.length > 28)
                      ? `${document.title.substring(0, 28)}...`
                      : document.title
                    }
                  </h4>
                </div>
                <p>
                  <Link to={{
                    pathname: 'profile',
                    state: { id: document.User.id}
                  }}>
                    {document.User.username}
                  </Link>
                </p>
              </div>
            </Paper>
          </MuiThemeProvider>
        </div>
      :
      ''
    }
  </div>
  );

export default documentStack;
