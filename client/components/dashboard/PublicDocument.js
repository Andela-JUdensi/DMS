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

class PublicDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      inputData: '',
      searchResult: this.props.search,
      publicDocumentTray: this.props.publicDocuments,
    };
    this.onUpdateInput = this.onUpdateInput.bind(this);
  }

  onUpdateInput(event) {
    this.setState({ inputData: event.target.value }, () => {
      this.props.searchAction(this.state.inputData, 'public');
    });
    setInterval(() => {
      if ((this.state.inputData.length > 0 || document.activeElement['id'] === 'publicDocumentSearch') && this.searchInput !== null) {
        this.searchInput.focus();
      } else if (this.searchInput !== null) {
        this.searchInput.blur();
      }
    }, 1000);
  }


  shouldComponentUpdate(nextProps) {
    if (this.props.search.length !== nextProps.search.length) {
      this.setState({ publicDocumentTray: nextProps.search });
      return true;
    }
    this.setState({ publicDocumentTray: this.props.publicDocuments });
    return false;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="public-box-dashboard">
          <div className="mui-col-md-6">
            <h3 className="dahsboard-block-head">
              Public Document
              <Badge
                badgeContent={this.props.publicDocuments.length}
                secondary
                badgeStyle={{ top: 5, left: 10 }}
              />
            </h3>
          </div>
          <div className="mui-col-md-6">
            <div className="dashboard-search">
              <TextField
                onChange={this.onUpdateInput}
                id="publicDocumentSearch"
                fullWidth
                hintText="Search for a public document"
                floatingLabelText="Search for a public document"
                ref={(input) => { this.searchInput = input; }}
              />
            </div>
          </div>
          <div className="mui-col-md-12">
            {
              this.state.inputData.length > 0
              ? this.props.search.map(documentStack)
              : this.state.publicDocumentTray.map(documentStack)
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


PublicDocuments.propTypes = {
  publicDocuments: PropTypes.array,
  searchAction: PropTypes.func.isRequired,
  search: PropTypes.any,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
});

export default withRouter(connect(mapStateToProps, { searchAction })(PublicDocuments));
