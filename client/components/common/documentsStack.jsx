import React from 'react';
import {
  Link
} from 'react-router-dom';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import ReactTooltip from 'react-tooltip';
import ViewDocumentInModal from './ViewDocumentInModal';
import Helpers from '../../utils/Helpers';


const style = {
  width: '100%',
  margin: 5,
  marginBottom: 25,
  padding: 5,
  textAlign: 'center',
  display: 'inline-block',
};

const documentStack = (document, index) => (
  <div key={document.id} >
    {
      index < 8
      ?
        <div className="mui-col-md-3 document-stack">
          <ReactTooltip />
          <ViewDocumentInModal documentToView={document} />
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Paper style={style} zDepth={3}>
              <div className="mui-col-md-12 each-document-in-stack">
                <div className="each-document-in-stack-topbar">
                  <span className="pull-left">
                    {document.access}
                  </span>
                  <span className="pull-right">
                    {Helpers.readDate(document.createdAt)}
                  </span>
                </div>
                <div className="each-document-in-stack-title">
                  <h4 data-tip={document.title}>
                    {(document.title.length > 28) ? `${document.title.substring(0, 28)}...` : document.title }
                  </h4>
                </div>
                <p>
                  <Link to={`/profile/${document.User.id}`}>
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
