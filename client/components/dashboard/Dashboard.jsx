import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
import RaisedButton from 'material-ui/RaisedButton';
import InfoBox from './InfoBox';
import documentStack from '../common/documentsStack';
import { getDocumentsAction } from '../../actions/documents.action';
import { userDocumentsAction } from '../../actions/users.action';
import { searchAction } from '../../actions/search.action';
import Helpers from '../../utils/Helpers';
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
    }

    this.getMoreDocuments = this.getMoreDocuments.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.props.dispatch(getDocumentsAction(12));
  }

  /**
   * 
   * determine of component will update
   * @param {object} nextProps 
   * @param {object} nextState 
   * @returns 
   * 
   * @memberof Dashboard
   */
   componentWillUpdate(nextProps, nextState) {
    if (!this.props.documents.totalCount || !nextProps.totalCount) {
      return true;
    } else {
      return false;
    }
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
    this.setState({ selectedView });
    if (['all', 'private', 'role', 'public'].includes(selectedView)) {
      return this.props.dispatch(getDocumentsAction(12, 0, 'ASC', selectedView));
    } else if (selectedView === 'own') {
      return this.props.dispatch(userDocumentsAction(this.props.currentUser.userID));
    }
    return this.props.dispatch(getDocumentsAction(12, 0));
  }

  /**
   * 
   * call action to get more documents upon pagination
   * @param {integer} offset 
   * 
   * @memberof Dashboard
   */
  getMoreDocuments(offset) {
    if (this.state.selectedView === 'own') {
      return this.props.dispatch(userDocumentsAction(this.props.currentUser.userID), offset);
    }
    if (this.state.inputData === '') {
      return this.props.dispatch(getDocumentsAction(12, offset, 'ASC', this.state.selectedView));
    }
    return this.props.searchAction(this.state.inputData, offset);
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
      this.props.searchAction(this.state.inputData);
    });
    setTimeout(() => {
      if ((this.state.inputData.length > 0 
        || document.activeElement['id'] === 'documentsSearch')
        && this.searchInput !== null) {
        this.searchInput.focus();
      } else if (this.searchInput !== null) {
        this.searchInput.blur();
        this.props.dispatch(getDocumentsAction(12));
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
      const { count } = this.props.documents;
      const { rows } = this.props.documents;
      const { currentUser, documents } = this.props;

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
                <Link to={{
                  pathname: 'profile',
                  state: { id: currentUser.userID }
                }}
                >
                    <InfoBox
                      Icon={GroupIcon}
                      color={cyan600}
                      title={currentUser.username.toUpperCase()}
                      value={Helpers.getRoleName(currentUser.roleID)}
                    />
                  </Link>
                </div>

                <div className="mui-col-md-3">
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
                    value={Helpers.countUserDocuments(documents, currentUser.userID)}
                  />
                </div>

                <div className="mui-col-md-3">
                <div> 
                  <SelectField
                    value={this.state.selectedView}
                    onChange={this.handleChange}
                    style={styles.selectDocuments}
                    hintText="Categorize by"
                    underlineStyle={{display: 'none', }}
                    selectedMenuItemStyle={{color: 'crimson'}}
                  >
                    <MenuItem value="all" primaryText="All documents" />
                    <MenuItem value="own" primaryText="Own documents" />
                    <MenuItem value="private" primaryText="Private" />
                    <MenuItem value="role" primaryText="Role" />
                    <MenuItem value="public" primaryText="Public" />
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
                  floatingLabelText="Search for a document"
                  ref={(input) => { this.searchInput = input; }}
                />
              </div>
              {rows.map(documentStack)}
            </div>
            <div className="mui-container">
              <div className="pagination">
                <Pagination
                  total={documents.pages}
                  current={documents.currentPage}
                  display={documents.pages}
                  onChange={number => this.getMoreDocuments((number - 1) * 12)}
                />
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
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
};

Dashboard.defaultProps = {
  count: 0,
  rows: [],
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

export default withRouter(connect(mapStateToProps, {
  searchAction
})(Dashboard));
