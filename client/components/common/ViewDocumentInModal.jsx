import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import { deleteDocumentAction, getDocumentsAction } from '../../actions/documents.action';
import EditDialog from './EditDialog';

/**
 * renders options to view a document
 * 
 * @class ViewDocumentInModal
 * @extends {React.Component}
 */
class ViewDocumentInModal extends React.Component {
  /**
   * Creates an instance of ViewDocumentInModal.
   * @param {object} props 
   * 
   * @memberof ViewDocumentInModal
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
   * open modal to view document
   * 
   * 
   * @memberof ViewDocumentInModal
   */
  openDocumentView() {
    this.setState({ openDocumentView: true });
  }

  /**
   * close document modal
   * 
   * 
   * @memberof ViewDocumentInModal
   */
  closeDocumentView() {
    this.setState({ openDocumentView: false });
  }

  /**
   * toggle delete modal option
   * 
   * 
   * @memberof ViewDocumentInModal
   */
  toggleDeleteDialog() {
    this.setState({ openDeleteDialog: !this.state.openDeleteDialog });
  }

  /**
   * open edit document modal
   * 
   * 
   * @memberof ViewDocumentInModal
   */
  openEditDialog() {
    this.setState({ openEditDialog: true });
  }

  /**
   * close edit document modal
   * 
   * 
   * @memberof ViewDocumentInModal
   */
  closeEditDialog() {
    this.setState({ openEditDialog: false });
  }

  /**
   * 
   * 
   * @param {integer} documentID 
   * 
   * @memberof ViewDocumentInModal
   */
  deleteDocument(documentID) {
    this.props.deleteDocumentAction(documentID)
      .then(() => {
        console.log('success');
        this.toggleDeleteDialog();
        this.setState({ message: 'document delete successfully' }, () => {
          this.setState({ openSnackbar: true });
        });
      })
      .catch((errors) => {
        this.setState({ message: errors }, () => {
          this.setState({ openSnackbar: true });
        })
      });
  }

  /**
   * renders options to viewDocument
   * 
   * @returns {Object}
   * 
   * @memberof ViewDocumentInModal
   */
  render() {
    const { ownerID, access, id } = this.props.documentToView;
    const { documentOwnerroleId } = this.props.documentToView.User;
    const userLinks = (
      <div>
        {
          (this.state.isAuthenticated)
          ? (ownerID === this.state.user.userId || [1, 2].includes(this.state.user.roleId))
            ? <div>
              <MenuItem primaryText="Edit" onTouchTap={() => this.openEditDialog()} />
              <MenuItem primaryText="Delete" onTouchTap={() => this.toggleDeleteDialog()} />
            </div>
            :
            <MenuItem primaryText="Email" />
            :
            <MenuItem primaryText="Email" />
        }
      </div>
    );

    const guestLinks = (
      <div>
        <MenuItem primaryText="Email" />
      </div>
    );

    const deleteDocumentActions = [
      <FlatButton
        label="Cancel"
        keyboardFocused
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
            message={this.state.message}
            autoHideDuration={40000}
          />

          <EditDialog openEditDialog={this.state.openEditDialog} closeEditDialog={this.closeEditDialog} documentToEdit={this.props.documentToView} />
          <Dialog
            title="Delete Document"
            modal={false}
            open={this.state.openDeleteDialog}
            actions={deleteDocumentActions}
            autoScrollBodyContent
          >
          Are you sure you want to delete this document<br />
            <h4>
            {this.props.documentToView.title}
          </h4>
          </Dialog>

          <DocumentViewDialog openDocumentView={this.state.openDocumentView} closeDocumentView={this.closeDocumentView} documentToView={this.props.documentToView} />
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {
              (this.state.isAuthenticated)
              ?
                userLinks
              :
              guestLinks
            }
          </IconMenu>

          <IconButton
            tooltip="View document"
            tooltipPosition="bottom-right"
            onTouchTap={this.openDocumentView}
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default withRouter(connect(null, {
  deleteDocumentAction
})(ViewDocumentInModal));
