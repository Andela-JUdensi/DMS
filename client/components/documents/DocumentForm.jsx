import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import LockIcon from 'material-ui/svg-icons/action/lock';
import RoleIcon from 'material-ui/svg-icons/action/group-work';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import Snackbar from 'material-ui/Snackbar';
import FormTextFields from '../common/FormTextFields';
import { getDocumentsAction, addDocumentAction } from '../../actions/documents.action';


const styles = {
  formStyle: {
    margin: 15,
  },
  button: {
    margin: 1,
    width: '',
    display: 'inline-block',
    position: 'relative',
  },
  formElement: {
    margin: 5,
  },
};

class DocumentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      access: '',
      errors: '',
      success: '',
      ownerID: this.props.ownerID,
      isLoading: false,
      snackBarOpen: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value, success: '' });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ error: '', isLoading: true });
    this.props.addDocumentAction(this.state)
      .then(() => {
        const { title, id } = this.props.newDocument;
        this.setState({
          title: '',
          body: '',
          access: '',
          errors: '',
          isLoading: false, 
          success: `${title} has been added successfully. View it here ${id}`,
          snackBarOpen: true,
        });
        this.props.getDocumentsAction();
      })
      .catch((errors) => {
        this.setState({ errors, isLoading: false, success: '', snackBarOpen: false });
      });
  }

  handleChange(event, index, access) {
    this.setState({ access });
  }

  render() {
    const { errors, isLoading, success } = this.state;
    return (
      <div className="mui-col-md-12 form-container">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div>
            <form onSubmit={this.onSubmit} style={styles.formStyle}>
              <h1>Add new Document</h1>
              {(errors) ? <p> {errors.message} </p> : ''}
              {(success) ? <p> {success} </p> : '' }
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
              <div className="mui-col-md-12">
                <TextField
                  name="body"
                  fullWidth
                  hintText="Document body/content"
                  value={this.state.body}
                  label="Document body"
                  floatingLabelText="Body of document goes here"
                  multiLine
                  rows={10}
                  onChange={this.onChange}
                />
              </div>
              <div className="mui-col-md-12">
                <RaisedButton
                  label="Save"
                  labelPosition="before"
                  icon={<PersonAdd />}
                  style={styles.button}
                  default
                  type="submit"
                  disabled={isLoading}
                  fullWidth
                />
              </div>
            </form>

            <Snackbar
              open={this.state.snackBarOpen}
              message="Document added"
              autoHideDuration={10000}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

DocumentForm.propTypes = {
  addDocumentAction: PropTypes.func.isRequired,
  getDocumentsAction: PropTypes.func.isRequired,
  ownerID: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  ownerID: state.authentication.user.userID,
  newDocument: state.documents.data,
});

export default withRouter(connect(mapStateToProps, { addDocumentAction, getDocumentsAction })(DocumentForm));
