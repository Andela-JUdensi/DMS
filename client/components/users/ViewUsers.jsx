import React from 'react';
import {
  withRouter
} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'material-ui-pagination';
import TextField from 'material-ui/TextField';
import { getAllUsersAction, searchUserAction } from '../../actions/users.action';
import AllUsersTable from './AllUsersTable';

/**
 * render users on table
 * 
 * @class ViewUsers
 * @extends {React.Component}
 */
class ViewUsers extends React.Component {
  /**
   * Creates an instance of ViewUsers.
   * @param {any} props 
   * 
   * @memberof ViewUsers
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      inputData: ''
    };

    this.props.getAllUsersAction(0);

    this.getMore = this.getMoreUsers.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
  }

  /**
   * calls getAllUsersAction
   * to get more users on pagination
   * 
   * @param {integer} offset 
   * @returns 
   * 
   * @memberof ViewUsers
   */
  getMoreUsers(offset) {
    if (this.state.inputData === '') {
      return this.props.getAllUsersAction(offset);
    }
    return this.props.searchUserAction(this.state.inputData, offset);

  }

  /**
   * determine if component will update
   * 
   * @param {object} nextProps 
   * @param {object} nextState 
   * @returns 
   * 
   * @memberof ViewUsers
   */
  componentWillUpdate(nextProps, nextState) {
    if (this.props.allUsers !== nextProps.allUsers) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * calls searchUserAction
   * makes live search
   * set focus on input field
   * 
   * @param {object} event 
   * 
   * @memberof ViewUsers
   */
  onUpdateInput(event) {
    this.setState({ inputData: event.target.value }, () => {
      this.props.searchUserAction(this.state.inputData);
    });
    setTimeout(() => {
      if ((this.state.inputData.length > 0 || document.activeElement['id'] === 'usersSearch') && this.searchInput !== null) {
        this.searchInput.focus();
      } else if (this.searchInput !== null) {
        this.searchInput.blur();
      }
    }, 250);
  }

  /**
   * 
   * 
   * @returns {Object}
   * 
   * @memberof ViewUsers
   */
  render() {
    const { allUsers } = this.props;
    return (
      <div className="mui-row">
        <div className="mui-col-md-offset-1 mui-col-md-10">
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div>


              <div className="dashboard-search">
                <TextField
                  onChange={this.onUpdateInput}
                  id="usersSearch"
                  fullWidth
                  hintText="Search for a user"
                  floatingLabelText="Search for a user"
                  ref={(input) => { this.searchInput = input; }}
                />
              </div>


              <Table
                selectable={false}
                adjustForCheckbox={false}
                className="users-list-table"
              >
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn tooltip="S/No">S/No</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Username">Username</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Email">Email</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Role">Role</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Visit user profile">Profile</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    allUsers.rows
                  ?
                    allUsers.rows.map(AllUsersTable)
                  :
                    ''
                  }
                </TableBody>
              </Table>
              <div className="pagination">
                <Pagination
                  total={allUsers.pages}
                  current={allUsers.currentPage}
                  display={allUsers.pages}
                  onChange={number => this.getMoreUsers((number - 1) * 5)}
                />
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

ViewUsers.propTypes = {
  getAllUsersAction: PropTypes.func.isRequired,
  searchUserAction: PropTypes.func.isRequired,
  allUsers: PropTypes.any.isRequired,

};

const mapStateToProps = state => ({
  allUsers: state.allUsers,
  authentication: state.authentication,
});
export default withRouter(connect(
    mapStateToProps, { getAllUsersAction, searchUserAction })(ViewUsers));
