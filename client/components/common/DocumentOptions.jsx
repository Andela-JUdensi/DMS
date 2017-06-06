import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import store from '../../store/configureStore';
import DocumentViewDialog from '../common/DocumentViewDialog';
import { deleteDocumentAction } from '../../actions/documents.action';
import EditDialog from './EditDialog';

/**
 * 
 * 
 * @class DocumentOptions
 * @extends {React.Component}
 */
class DocumentOptions extends React.Component {

  /**
   * Creates an instance of DocumentOptions.
   * @param {any} props 
   * 
   * @memberof DocumentOptions
   */
  constructor(props) {
    super(props);
    const storeState = store.getState();
    const { isAuthenticated, user } = storeState.authentication;
    this.state = {
      openDocumentView: false,
      openDeleteDialog: false,
      openSnackbar: false,
      openEditDialog: false,
      isAuthenticated,
      user,
    };
    this.openDocumentView = this.openDocumentView.bind(this);
    this.closeDocumentView = this.closeDocumentView.bind(this);
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
    this.openEditDialog = this.openEditDialog.bind(this);
    this.closeEditDialog = this.closeEditDialog.bind(this);
  }

  /**
   * 
   * 
   * 
   * @memberof DocumentOptions
   */
  openDocumentView() {
    this.setState({ openDocumentView: true });
  }

  /**
   * 
   * 
   * 
   * @memberof DocumentOptions
   */
  closeDocumentView() {
    this.setState({ openDocumentView: false });
  }

  /**
   * 
   * 
   * 
   * @memberof DocumentOptions
   */
  toggleDeleteDialog() {
    this.setState({ openDeleteDialog: !this.state.openDeleteDialog });
  }

  /**
   * 
   * 
   * 
   * @memberof DocumentOptions
   */
  openEditDialog() {
    this.setState({ openEditDialog: true });
  }

  /**
   * 
   * 
   * 
   * @memberof DocumentOptions
   */
  closeEditDialog() {
    this.setState({ openEditDialog: false });
  }

  /**
   * 
   * 
   * @param {any} documentID 
   * 
   * @memberof DocumentOptions
   */
  deleteDocument(documentID) {
    this.props.deleteDocumentAction(documentID);
  }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberof DocumentOptions
   */
  render() {
    const {
      ownerID,
      access,
      id,
      User: { roleId }
    } = this.props.documentToView;

    let userLinks = <MenuItem primaryText="Email" />;

    if (this.state.isAuthenticated) {
      const editLink = (
        <div>
          <MenuItem
            primaryText="Edit"
            onTouchTap={() => this.openEditDialog()}
            className="edit-document"
          />
        </div>
      );

      const deleteLink = (
        <MenuItem
          primaryText="Delete"
          onTouchTap={() => this.toggleDeleteDialog()}
          className="delete-document"
        />
      );

      if(ownerID === this.state.user.userId) {
        userLinks = (
          <div>
            {editLink}
            {deleteLink}
          </div>
        )
      } else if ([1, 2].includes(this.state.user.roleId)){
        userLinks = (
          <div>
            {deleteLink}
          </div>
        )
      }
    }

    const deleteDocumentActions = [
      <FlatButton
        label="Cancel"
        keyboardFocused
        className="toggle-delete-dialog-close"
        onTouchTap={() => this.toggleDeleteDialog()}
        primary
      />,
      <FlatButton
        label="Delete"
        keyboardFocused
        onTouchTap={() => this.deleteDocument(id)}
        primary
      />,
    ];

    return (
      <MuiThemeProvider>
        <div>

          <Snackbar
            open={this.state.openSnackbar}
            message="Document deleted successfully"
            autoHideDuration={40000}
          />

          <EditDialog
            openEditDialog={this.state.openEditDialog}
            closeEditDialog={this.closeEditDialog}
            documentToEdit={this.props.documentToView}
          />

          <Dialog
            title="Delete Document"
            className="open-delete-dialog"
            modal={false}
            open={this.state.openDeleteDialog}
            actions={deleteDocumentActions}
            autoScrollBodyContent
          >
            <p className="delete-document-warning">
              Are you sure you want to delete this document<br />
            </p>
            <h4>
              {this.props.documentToView.title}
            </h4>
          </Dialog>

          <DocumentViewDialog
            openDocumentView={this.state.openDocumentView}
            closeDocumentView={this.closeDocumentView}
            documentToView={this.props.documentToView}
          />

          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            className="document-options"
          >
            {userLinks}
          </IconMenu>

          <IconButton
            tooltip="View document"
            tooltipPosition="bottom-right"
            className="open-document-view"
            onTouchTap={this.openDocumentView}
          >
            <VisibilityIcon
              className="read-document-icon"
            />
          </IconButton>
        </div>
      </MuiThemeProvider>
    );
  }
}

DocumentOptions.propTypes = {
  documentToView: PropTypes.object.isRequired,
};


export default withRouter(connect(null, {
  deleteDocumentAction
})(DocumentOptions));

export { DocumentOptions }
