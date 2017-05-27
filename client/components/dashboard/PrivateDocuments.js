import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Badge from 'material-ui/Badge';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import documentStack from '../common/documentsStack';
import { searchAction } from '../../actions/search.action';

class PrivateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      inputData: '',
      searchResult: this.props.search,
      privateDocumentTray: this.props.privateDocuments,
    };
    this.onUpdateInput = this.onUpdateInput.bind(this);
  }

  onUpdateInput(event) {
    this.setState({ inputData: event.target.value }, () => {
      this.props.searchAction(this.state.inputData, 'private');
    });
    setInterval(() => {
      if ((this.state.inputData.length > 0 ||
        document.activeElement.id === 'privateDocumentSearch')
        && this.searchInput !== null) {
        this.searchInput.focus();
      } else if (this.searchInput !== null) {
        this.searchInput.blur();
      }
    }, 1000);
  }


  shouldComponentUpdate(nextProps) {
    if (this.props.search.length !== nextProps.search.length) {
      this.setState({ privateDocumentTray: nextProps.search });
      return true;
    }
    this.setState({ privateDocumentTray: this.props.privateDocuments });
    return false;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="private-box-dashboard">
          <div className="mui-col-md-6">
            <h3 className="dahsboard-block-head">
              Private Document
              <Badge
                badgeContent={this.props.privateDocuments.length}
                secondary
                badgeStyle={{ top: 5, left: 10 }}
              />
            </h3>
          </div>
          <div className="mui-col-md-6">
            <div className="dashboard-search">
              <TextField
                onChange={this.onUpdateInput}
                id="privateDocumentSearch"
                fullWidth
                hintText="Search for a private document"
                floatingLabelText="Search for a private document"
                ref={(input) => { this.searchInput = input; }}
              />
            </div>
          </div>
          <div className="mui-col-md-12">
            {
              this.state.inputData.length > 0
              ? this.props.search.map(documentStack)
              : this.state.privateDocumentTray.map(documentStack)
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


PrivateDocument.propTypes = {
  privateDocuments: PropTypes.array,
  searchAction: PropTypes.func.isRequired,
  search: PropTypes.any,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
});

export default withRouter(connect(mapStateToProps, { searchAction })(PrivateDocument));
