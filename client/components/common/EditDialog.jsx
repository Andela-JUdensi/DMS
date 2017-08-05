import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import LockIcon from 'material-ui/svg-icons/action/lock';
import RoleIcon from 'material-ui/svg-icons/action/group-work';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import Snackbar from 'material-ui/Snackbar';
import Editor from 'react-markdown-editor';
import FormTextFields from '../common/FormTextFields';
import { editDocumentAction } from '../../actions/documents.action';
import styles from '../../assets/styles';

const MarkdownEditor = Editor.MarkdownEditor;

/**
 * 
 * 
 * @class EditDialog
 * @extends {React.Component}
 */
class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.documentToEdit.title,
      body: this.props.documentToEdit.body,
      access: this.props.documentToEdit.access,
      open: this.props.openEditDialog,
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  /**
   * set document title in state
   * 
   * @param {object} event - change event triggered 
   * 
   * @memberof EditDialog
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value, success: '' });
  }

  /**
   * set state for dropdown/select
   * changes document access
   * 
   * @param {object} event - change event triggered
   * @param {} index - value index
   * @param {any} access - access selected from select field
   * 
   * @memberof EditDialog
   */
  handleChange(event, index, access) {
    this.setState({ access });
  }

  /**
   * set document content/body in state
   * 
   * @param {string} body - content of article
   * 
   * @memberof EditDialog
   */
  onContentChange(body) {
    this.setState({ body });
  }

  /**
   * call editDocumentAction to update document
   * 
   * @param {object} event - submit event triggered
   * 
   * @memberof EditDialog
   */
  onSubmit(event) {
    event.preventDefault();
    // this.setState({ error: '', isLoading: true });
    this.props.editDocumentAction(this.props.documentToEdit.id, this.state)
      .then((response) => {
        // this.setState({ open: false });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  /**
   * renders component to DOM
   * 
   * @returns {Object}
   * 
   * @memberof EditDialog
   */
  render() {
    const { isLoading } = this.state;
    const editDialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => this.props.closeEditDialog()}
      />
    ];
    return (
      <Dialog
        title={this.props.documentToEdit.title}
        actions={editDialogActions}
        modal={false}
        open={this.props.openEditDialog}
        autoScrollBodyContent
      >
        <MuiThemeProvider>
          <div>
            <form
              style={styles.formStyle}
              className="edit-document-form"
            >
              <div className="mui-col-md-6">
                <FormTextFields
                  field="title"
                  value={this.state.title}
                  label="Document title"
                  type="text"
                  onChange={this.onChange}
                />
              </div>
              <div className="mui-col-md-6">
                <SelectField
                  floatingLabelText="Access level"
                  value={this.state.access}
                  onChange={this.handleChange}
                >
                  <MenuItem value="private" primaryText="Private" rightIcon={<LockIcon />} />
                  <MenuItem value="role" primaryText="Role" rightIcon={<RoleIcon />} />
                  <MenuItem value="public" primaryText="Public" rightIcon={<AccessibilityIcon />} />
                </SelectField>
              </div>
              <div className="mui-col-md-12 markdown-editor-edit">
                <MarkdownEditor
                  initialContent={this.state.body}
                  iconsSet="font-awesome"
                  name="body"
                  onContentChange={this.onContentChange}
                  value={this.state.body}
                />
              </div>
              <div className="mui-col-md-12">
                <RaisedButton
                  label="Update"
                  labelPosition="before"
                  style={styles.button}
                  primary
                  disabled={isLoading}
                  fullWidth
                  onTouchTap={this.onSubmit}
                />
              </div>
            </form>
          </div>
        </MuiThemeProvider>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  documentToEdit: PropTypes.object
};

EditDialog.defaultProps = {
  documentToEdit: {}
};

export default withRouter(connect(null, {
  editDocumentAction
})(EditDialog));
