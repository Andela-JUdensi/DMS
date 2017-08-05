import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import marked from 'marked';
import Paper from 'material-ui/Paper';
import { Utilities } from '../../Helpers';

/**
 * 
 * 
 * @class DocumentViewDialog
 * @extends {React.Component}
 */
class DocumentViewDialog extends React.Component {
  /**
   * Creates an instance of DocumentViewDialog.
   * @param {any} props 
   * 
   * @memberof DocumentViewDialog
   */
  constructor(props) {
    super(props);
    this.state = {
      style: {
        background: 'rgba(0, 0, 0, .5)',
      }
    };
    this.toggleZenMode = this.toggleZenMode.bind(this);
  }

  /**
   * toggle background color in read mode
   * between zenmode and normal background
   * 
   * 
   * @memberof DocumentViewDialog
   */
  toggleZenMode() {
    this.state.style.background === 'rgba(0, 0, 0, .5)' ?
      this.setState({ style: { background: 'rgba(0, 0, 0, 1)' } }) :
      this.setState({ style: { background: 'rgba(0, 0, 0, .5)' } });
  }

  /**
   * renders component to DOM
   * 
   * @returns {Object}
   * 
   * @memberof DocumentViewDialog
   */
  render() {
    const documentToView = this.props.documentToView;

    const actions = [
      <FlatButton
        label="Toggle Zen mode"
        primary
        onTouchTap={this.toggleZenMode}
        className="toggle-zen-mode-button"
      />,
      <FlatButton
        label="Done"
        primary
        onTouchTap={this.props.closeDocumentView}
        className="close-document-view-button"
      />
    ];
    return (
      <MuiThemeProvider>
        <Paper zDepth={3}>
          <Dialog
            title={documentToView.title}
            actions={actions}
            modal={false}
            open={this.props.openDocumentView}
            autoScrollBodyContent
            className="document-view-dialog"
            style={this.state.style}
          >
            <div
              className="document-view-body"
              dangerouslySetInnerHTML={{ __html: marked(documentToView.body)}}
            />
            <hr />
            <span className="document-date">
              { Utilities.readDate(documentToView.createdAt)}
            </span>
            <span className="document-user">
              { documentToView.User.username }
            </span>
          </Dialog>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default DocumentViewDialog;
