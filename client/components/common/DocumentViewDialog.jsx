import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import Helpers from '../../utils/Helpers';

class DocumentViewDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        background: 'rgba(0, 0, 0, .5)',
      }
    };
    this.toggleZenMode = this.toggleZenMode.bind(this);
  }

  toggleZenMode() {
    this.state.style.background === 'rgba(0, 0, 0, .5)' ?
      this.setState({ style: { background: 'rgba(0, 0, 0, 1)' } }) :
      this.setState({ style: { background: 'rgba(0, 0, 0, .5)' } });
  }

  render() {
    const document = this.props.documentToView;

    const actions = [
      <FlatButton
        label="Toggle Zen mode"
        primary
        onTouchTap={this.toggleZenMode}
        className="button"
      />,
      <FlatButton
        label="Done"
        primary
        onTouchTap={this.props.closeDocumentView}
        className="button"
      />
    ];
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Paper zDepth={3}>
          <Dialog
            title={document.title}
            actions={actions}
            modal={false}
            open={this.props.openDocumentView}
            autoScrollBodyContent
            className="document-view-dialog"
            style={this.state.style}
          >
            <hr />
            { document.body }
            <hr />
            <span className="document-date">
              { Helpers.readDate(document.createdAt)} { Helpers.readDate(document.updatedAt)}
            </span>
            <span className="document-user">
              { document.User.username } { document.User.email }
            </span>
          </Dialog>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default DocumentViewDialog;
