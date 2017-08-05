import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropType from 'prop-types';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GroupIcon from 'material-ui/svg-icons/social/group';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import { cyan600, pink600, purple600, orange600 } from 'material-ui/styles/colors';
import Pagination from 'material-ui-pagination';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import IconButton from 'material-ui/IconButton';
import FilterIcon from 'material-ui/svg-icons/action/swap-vert';
import InfoBox from './InfoBox';
import documentStack from '../common/documentsStack';
import  * as documentActions from '../../actions/documents.action';
import * as userActions from '../../actions/users.action';
import * as searchActions from '../../actions/search.action';
import { Utilities } from '../../Helpers/';
import styles from '../../assets/styles';

/**
 * 
 * renders application dashboard
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  /**
   * Creates an instance of Dashboard.
   * @param {object} props 
   * 
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);
    this.state = {
      inputData: '',
      selectedView: 'all',
      offset: 0
    }

    this.pageSize = 12;
    this.offset = 0;

    this.getMoreDocuments = this.getMoreDocuments.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterDocuments = this.filterDocuments.bind(this);

    this.props.documentActions.getDocumentsAction(this.pageSize);
  }

    /**
     * call getDocumentsAction
     * only if a document has been deleted
     * ensure we have a filled up dashboard
     * 
     * @memberof Dashboard
     */
    componentWillUpdate(nextProps) {
      if (nextProps.documents.status === 'deleted') {
        this.props.documentActions
          .getDocumentsAction(this.state.pageSize, this.state.offset);
      }
    }


    componentWillUnMount() {
      this.props.documents = {};
      this.setState({
        inputData: '',
        selectedView: 'all',
        offset: 0
      })
    }

  /**
   * filter document on dashboard
   * based on selected view
   * 
   * @returns 
   * 
   * @memberof Dashboard
   */
  filterDocuments(selectedView) {
    if (['all', 'private', 'role', 'public']
      .includes(selectedView)) {
      return this.props.documentActions
        .getDocumentsAction(this.pageSize, this.offset, 'ASC', selectedView);
    } else if (selectedView === 'own') {
      return this.props.userActions
        .userDocumentsAction(this.props.currentUser.userId);
    }
    return this.props.documentActions.getDocumentsAction((this.pageSize, this.offset));
  }

  /**
   * handle state change for `categorize by` dropdown
   * 
   * @param {object} event 
   * @param {integer} index 
   * @param {string} selectedView 
   * @returns 
   * 
   * @memberof Dashboard
   */
  handleChange(event, index, selectedView) {
    this.setState({ selectedView }, () => {
      this.filterDocuments(selectedView);
    });
  }

  /**
   * 
   * call action to get more documents upon pagination
   * @param {integer} offset 
   * 
   * @memberof Dashboard
   */
  getMoreDocuments(offset) {
    this.setState({ offset });
    if (this.state.selectedView === 'own') {
      return this.props.userActions.userDocumentsAction(this.props.currentUser.userId, offset);
    }
    if (this.state.inputData === '') {
      return this.props.documentActions.getDocumentsAction(this.pageSize, offset, 'ASC', this.state.selectedView);
    }
    return this.props.searchActions.searchAction(this.state.inputData, offset);
  }

  /**
   * 
   * handles livesearch call and set input field on focus
   * @param {object} event 
   * 
   * @memberof Dashboard
   */
  onUpdateInput(event) {
    this.setState({ inputData: event.target.value }, () => {
      this.props.searchActions.searchAction(this.state.inputData);
    });
    setTimeout(() => {
      if ((this.state.inputData.length > 0 
        || document.activeElement['id'] === 'documentsSearch')
        && this.searchInput !== null) {
        this.searchInput.focus();
      } else if (this.searchInput !== null) {
        this.searchInput.blur();
        this.props.documentActions.getDocumentsAction(12);
      }
    }, 250);
  }

  /**
   * 
   * 
   * @returns {Object}
   * 
   * @memberof Dashboard
   */
  render() {
    if (this.props.documents.rows) {
      const { currentUser, documents, documents: {
        count, rows, metaData
      } } = this.props;

      if (currentUser.username) {
        return (
          <MuiThemeProvider>
            <div className="mui-row">
              <div className="mui-container">
                <div className="mui-col-md-12">
                  <h3 className="app-breadcum">
                    <span>
                    Application / Dashboard
                  </span>
                  </h3>

                  <div className="mui-col-md-3">
                    <InfoBox
                      Icon={GroupIcon}
                      color={cyan600}
                      title={currentUser.username.toUpperCase()}
                      value={Utilities.getRoleName(currentUser.roleId)}
                    />
                  </div>

                  <div className="mui-col-md-3 dashboard-document-count">
                    <InfoBox
                      Icon={DescriptionIcon}
                      color={pink600}
                      title="Documents access"
                      value={count}
                    />
                  </div>

                  <div className="mui-col-md-3">
                    <InfoBox
                      Icon={Assessment}
                      color={purple600}
                      title="My Documents"
                      value={Utilities.countUserDocuments(documents, currentUser.userId)}
                    />
                  </div>

                  <div className="mui-col-md-3">
                  <div> 
                    <SelectField
                      value={this.state.selectedView}
                      onChange={this.handleChange}
                      style={styles.selectDocuments}
                      hintText="Categorize by"
                      className="selected-view"
                      underlineStyle={{display: 'none', }}
                      selectedMenuItemStyle={{color: 'crimson'}}
                    >
                      <MenuItem
                        className="select-view-all"
                        value="all"
                        primaryText="All documents"
                      />
                      <MenuItem
                        className="select-view-own"
                        value="own"
                        primaryText="Own documents"
                      />
                      <MenuItem
                        className="select-view-private"
                        value="private"
                        primaryText="Private"
                        />
                      <MenuItem
                        className="select-view-role"
                        value="role"
                        primaryText="Role"
                      />
                      <MenuItem
                        className="select-view-public"
                        value="public"
                        primaryText="Public"
                      />
                    </SelectField>
                  </div>
                  </div>
                </div>
              </div>
              <br /><br /><br />
              <div className="mui-container">
                <div className="dashboard-search">
                  <TextField
                    onChange={this.onUpdateInput}
                    id="documentsSearch"
                    fullWidth
                    hintText="Search for a user"
                    value={this.state.inputData}
                    floatingLabelText="Search for a document"
                    ref={(input) => { this.searchInput = input; }}
                  />
                </div>
                {rows.map(documentStack)}
              </div>
              <div className="mui-container">
                <div className="pagination">
                  <Pagination
                    total={metaData.pages}
                    current={metaData.currentPage}
                    display={metaData.pages}
                    onChange={number => this.getMoreDocuments((number - 1) * 12)}
                  />
                </div>
              </div>
            </div>
          </MuiThemeProvider>
        );
      }
    }
    return (
      <h1>Dashboard</h1>
    );
  }
}

Dashboard.propTypes = {
  count: PropType.number.isRequired,
  rows: PropType.array.isRequired,
  currentUser: PropType.object.isRequired,
  documents: PropType.object.isRequired,
  documentActions: PropType.object.isRequired,
};

Dashboard.defaultProps = {
  count: 0,
  rows: [],
  currentUser: {},
  documents: {},
  documentActions: () => {},
};

/**
 * 
 * @param {object} state - redux state
 */
const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    currentUser: state.authentication.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    documentActions: bindActionCreators(documentActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
} 

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(Dashboard));

export { Dashboard };

